// url-hook.js
import { useRef, useState, useEffect } from "react";
import { urlApiCall, getAllUrls, updateUrlLabel } from "../api/url-api";

export const useURL = () => {
  const urlRef = useRef();
  const [shortUrl, setShortUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);

  const fetchUrls = async () => {
    try {
      setFetchLoading(true);
      const data = await getAllUrls();      // Normalize response into objects with shortUrl and bigUrl
      let normalized = [];

      const getBrand = (hostname) => {
        try {
          // Domain-specific brand mapping
          const brandMap = {
            'unsplash.com': 'Unsplash',
            'images.unsplash.com': 'Unsplash',
            'amazon.com': 'Amazon',
            'amazon.in': 'Amazon',
            'flipkart.com': 'Flipkart',
            'pexels.com': 'Pexels'
          };
          
          // Check if the hostname matches or contains any of our known domains
          for (const [domain, brand] of Object.entries(brandMap)) {
            if (hostname === domain || hostname.includes(domain)) {
              return brand;
            }
          }
          
          // Default case: use the second-to-last part of the hostname
          const parts = hostname.split('.');
          const brand = parts.length >= 2 ? parts[parts.length - 2] : hostname;
          
          // Capitalize first letter
          return brand.charAt(0).toUpperCase() + brand.slice(1);
        } catch (e) {
          return hostname || 'misc';
        }
      };

      const getDisplayName = (bigUrl) => {
        try {
          const u = new URL(bigUrl);
          const pathParts = u.pathname.split('/').filter(Boolean);

          const idLike = (s) => /^[A-Z0-9\-_]{4,}$/.test(s.replace(/[^A-Z0-9\-_]/gi, ''));
          const noise = new Set(['dp', 'gp', 'product', 'product-name', 'ref', 'promo']);

          const cleanSeg = (seg) => {
            let s = seg.replace(/\.[a-zA-Z0-9]{1,6}$/, '');
            s = decodeURIComponent(s).replace(/[_\-]+/g, ' ').trim();
            s = s.replace(/ref=.*$/i, '').replace(/\?.*$/, '').trim();
            return s;
          };

          const format = (s) => {
            if (!s) return s;
            // remove leftover tokens that look like IDs
            if (idLike(s)) return '';
            return s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ').trim();
          };

          // 1) prefer the first meaningful segment (often product slug on ecommerce sites)
          for (let seg of pathParts) {
            const s = cleanSeg(seg);
            if (!s) continue;
            const lower = s.toLowerCase();
            if (noise.has(lower)) continue;
            if (/[a-zA-Z]/.test(s) && s.replace(/\s+/g, '').length > 3 && !idLike(s)) {
              const f = format(s);
              if (f) return f;
            }
          }

          // 2) fallback to the last meaningful segment
          for (let i = pathParts.length - 1; i >= 0; i--) {
            const s = cleanSeg(pathParts[i]);
            if (!s) continue;
            if (/[a-zA-Z]/.test(s) && s.replace(/\s+/g, '').length > 2 && !idLike(s)) {
              const f = format(s);
              if (f) return f;
            }
          }

          // 3) fallback to first cleaned segment
          if (pathParts.length > 0) {
            const s = cleanSeg(pathParts[0]);
            const f = format(s);
            if (f) return f;
          }

          return u.hostname;
        } catch (e) {
          return bigUrl;
        }
      };

      if (Array.isArray(data)) {
        normalized = data.map((doc) => {
          const shortUrl = doc.shortUrl || `${import.meta.env.VITE_BASE_URL || ""}small/${doc.shortid}`;
          const bigUrl = doc.bigurl || doc.bigUrl || doc.bigURL || "";
          const hostname = (() => { try { return new URL(bigUrl).hostname } catch (e) { return '' } })();
          const brand = hostname ? getBrand(hostname) : 'misc';
          let title = doc.label || (bigUrl ? getDisplayName(bigUrl) : shortUrl);
          if (!title || title.trim() === '') title = shortUrl;
          return { _id: doc._id, shortUrl, bigUrl, hostname, brand, title };
        });
      } else if (data && Array.isArray(data.docs)) {
        normalized = data.docs.map((doc) => {
          const shortUrl = doc.shortUrl || `${import.meta.env.VITE_BASE_URL || ""}small/${doc.shortid}`;
          const bigUrl = doc.bigurl || doc.bigUrl || doc.bigURL || "";
          const hostname = (() => { try { return new URL(bigUrl).hostname } catch (e) { return '' } })();
          const brand = hostname ? getBrand(hostname) : 'misc';
          let title = doc.label || (bigUrl ? getDisplayName(bigUrl) : shortUrl);
          if (!title || title.trim() === '') title = shortUrl;
          return { _id: doc._id, shortUrl, bigUrl, hostname, brand, title };
        });
      } else {
        console.warn("Unexpected getAllUrls response shape:", data);
      }

      setUrls(normalized);
    } catch (error) {
      console.error("Failed to fetch URLs:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleGenerateURL = async () => {
    const bigUrl = urlRef.current.value; 
    if (!bigUrl) {
      alert("Please enter a URL");
      return;
    }

    try {
      setLoading(true);
      const data = await urlApiCall(bigUrl);
      setShortUrl(data.shortUrl);
      console.log("Short URL: ", data.shortUrl);
      // Refresh the URLs list after creating a new one
      fetchUrls();
    } catch (error) {
      alert("Failed to generate short URL",error);
    } finally {
      setLoading(false);
    }
  };

  const updateLabel = async (id, label) => {
    try {
      const res = await updateUrlLabel(id, label);
      // update local state
      setUrls((prev) => prev.map(u => u._id === id ? { ...u, title: label, label } : u));
      return res;
    } catch (err) {
      console.error('Failed to update label', err);
      throw err;
    }
  };

  return { urlRef, shortUrl, handleGenerateURL, loading, urls, fetchLoading, updateLabel };
};
