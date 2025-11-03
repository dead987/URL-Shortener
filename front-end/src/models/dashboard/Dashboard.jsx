import { useState, useEffect } from "react";
import { Menu, X, LogOut, Link2, Copy, ExternalLink, Trash2, Home, Check, ChevronDown, ChevronRight } from "lucide-react";
import { useURL } from "../../models/user/hooks/url-hook.js";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../shared/utils/auth-utils.js";

const Dashboard = () => {
  const navigate = useNavigate();
  const { urlRef, shortUrl, handleGenerateURL, loading, urls, fetchLoading, updateLabel } = useURL();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const [isOpen, setIsOpen] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const [urlHistory, setUrlHistory] = useState([]);
  const [expandedGroups, setExpandedGroups] = useState({});

  // Extract domain from URL
  const extractDomain = (url) => {
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname.toLowerCase();
      
      // Extract main domain name
      if (hostname.includes('amazon')) return 'Amazon';
      if (hostname.includes('pexels')) return 'Pexels';
      if (hostname.includes('youtube')) return 'YouTube';
      if (hostname.includes('github')) return 'GitHub';
      if (hostname.includes('google')) return 'Google';
      if (hostname.includes('facebook')) return 'Facebook';
      if (hostname.includes('twitter') || hostname.includes('x.com')) return 'Twitter';
      if (hostname.includes('instagram')) return 'Instagram';
      if (hostname.includes('linkedin')) return 'LinkedIn';
      
      // Generic domain extraction (remove www. and .com/.org/etc)
      const parts = hostname.replace('www.', '').split('.');
      if (parts.length > 1) {
        return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
      }
      
      return 'Miscellaneous';
    } catch (e) {
      return 'Miscellaneous';
    }
  };

  // Sync urls from hook to local state for display
  useEffect(() => {
    if (urls && urls.length > 0) {
      const formatted = urls.map(url => ({
        id: url._id,
        originalUrl: url.bigUrl || url.originalUrl || "",
        shortUrl: url.shortUrl || "",
        title: url.title || "",
        createdAt: url.createdAt ? new Date(url.createdAt).toLocaleString() : new Date().toLocaleString(),
        brand: extractDomain(url.bigUrl || url.originalUrl || ""),
      }));
      setUrlHistory(formatted);
      
      // Initialize all groups as expanded
      const groups = {};
      formatted.forEach(item => {
        if (!groups[item.brand]) {
          groups[item.brand] = true;
        }
      });
      setExpandedGroups(groups);
    }
  }, [urls]);

  // Add new URL to history when shortUrl changes
  useEffect(() => {
    if (shortUrl && urlRef.current?.value) {
      const exists = urlHistory.find(item => item.shortUrl === shortUrl);
      if (!exists) {
        const brand = extractDomain(urlRef.current.value);
        const newEntry = {
          id: Date.now(),
          originalUrl: urlRef.current.value,
          shortUrl: shortUrl,
          title: shortUrl.split('/').pop() || shortUrl,
          createdAt: new Date().toLocaleString(),
          brand: brand,
        };
        setUrlHistory(prev => [newEntry, ...prev]);
        
        // Ensure the group is expanded
        setExpandedGroups(prev => ({
          ...prev,
          [brand]: true,
        }));
      }
    }
  }, [shortUrl]);

  // Group URLs by brand
  const groupedUrls = urlHistory.reduce((acc, url) => {
    const brand = url.brand || 'Miscellaneous';
    if (!acc[brand]) {
      acc[brand] = [];
    }
    acc[brand].push(url);
    return acc;
  }, {});

  // Sort brands alphabetically, but keep Miscellaneous last
  const sortedBrands = Object.keys(groupedUrls).sort((a, b) => {
    if (a === 'Miscellaneous') return 1;
    if (b === 'Miscellaneous') return -1;
    return a.localeCompare(b);
  });

  const toggleGroup = (brand) => {
    setExpandedGroups(prev => ({
      ...prev,
      [brand]: !prev[brand],
    }));
  };

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id) => {
    setUrlHistory(prev => prev.filter(item => item.id !== id));
    // TODO: Call your delete API here if you have one
  };

  // Get brand icon/color
  const getBrandColor = (brand) => {
    const colors = {
      'Amazon': 'text-orange-400',
      'Pexels': 'text-green-400',
      'YouTube': 'text-red-400',
      'GitHub': 'text-purple-400',
      'Google': 'text-blue-400',
      'Facebook': 'text-blue-500',
      'Twitter': 'text-sky-400',
      'Instagram': 'text-pink-400',
      'LinkedIn': 'text-blue-600',
      'Miscellaneous': 'text-slate-400',
    };
    return colors[brand] || 'text-slate-400';
  };

  return (
    <div className="relative h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex flex-col overflow-hidden">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-slate-700/20 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-slate-600/20 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-500/10 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-white/5 bg-slate-900/50 backdrop-blur-md">
        <div className="px-6 sm:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center group-hover:from-slate-500 group-hover:to-slate-600 transition-all">
                <Link2 className="w-5 h-5 text-slate-100" />
              </div>
              <span className="text-lg font-semibold text-slate-100 tracking-tight">URLify</span>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* <Link
                to="/"
                className="hidden sm:flex items-center space-x-2 text-slate-300 hover:text-white transition-colors text-sm font-medium"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link> */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-slate-300 hover:text-white transition-all text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-md hover:bg-slate-800 transition"
              >
                <Menu className="w-6 h-6 text-slate-300" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 flex flex-1 overflow-hidden">
        {/* Sidebar - URL History with Brand Grouping */}
        <div
          className={`${
            isOpen ? "w-80 sm:w-96" : "w-14 sm:w-16"
          } bg-slate-900/50 backdrop-blur-md border-r border-white/5 transition-all duration-500 ease-in-out flex flex-col`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-white/5">
            {isOpen && (
              <div className="flex items-center space-x-2">
                <Link2 className="w-5 h-5 text-slate-400" />
                <h2 className="text-base sm:text-lg font-semibold text-slate-200">
                  URL History
                </h2>
              </div>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-slate-800/50 transition"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-slate-300" />
              ) : (
                <Menu className="w-5 h-5 text-slate-300" />
              )}
            </button>
          </div>

          {/* URL History List with Grouping */}
          <div className="flex-1 overflow-y-auto">
            {isOpen ? (
              <div className="p-3 sm:p-4 space-y-4">
                {fetchLoading && (
                  <div className="text-center py-12 px-4">
                    <div className="animate-spin w-8 h-8 border-2 border-slate-600 border-t-slate-400 rounded-full mx-auto mb-3"></div>
                    <p className="text-sm text-slate-400">Loading URLs...</p>
                  </div>
                )}

                {!fetchLoading && urlHistory.length === 0 && (
                  <div className="text-center py-12 px-4">
                    <Link2 className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                    <p className="text-slate-400 text-sm">
                      No URLs shortened yet
                    </p>
                    <p className="text-slate-500 text-xs mt-1">
                      Your history will appear here
                    </p>
                  </div>
                )}

                {!fetchLoading && sortedBrands.length > 0 && sortedBrands.map((brand) => (
                  <div key={brand} className="space-y-2">
                    {/* Brand Header - Collapsible */}
                    <button
                      onClick={() => toggleGroup(brand)}
                      className="w-full flex items-center justify-between px-3 py-2 bg-slate-800/30 hover:bg-slate-800/50 rounded-lg transition-all group"
                    >
                      <div className="flex items-center space-x-2">
                        {expandedGroups[brand] ? (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        )}
                        <span className={`text-sm font-semibold ${getBrandColor(brand)}`}>
                          {brand}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-0.5 rounded-full">
                        {groupedUrls[brand].length}
                      </span>
                    </button>

                    {/* Brand URLs */}
                    {expandedGroups[brand] && (
                      <div className="space-y-2 pl-2">
                        {groupedUrls[brand].map((item) => (
                          <div
                            key={item.id}
                            className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg p-3 hover:border-slate-600/50 transition-all group"
                          >
                            {/* Original URL */}
                            <div className="mb-2">
                              <p className="text-xs text-slate-500 mb-1">Original</p>
                              <p className="text-sm text-slate-300 truncate" title={item.originalUrl}>
                                {item.originalUrl}
                              </p>
                            </div>

                            {/* Short URL */}
                            <div className="mb-2">
                              <p className="text-xs text-slate-500 mb-1">Shortened</p>
                              <a
                                href={item.shortUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm text-slate-400 hover:text-slate-300 truncate block"
                                title={item.shortUrl}
                              >
                                {item.shortUrl}
                              </a>
                            </div>

                            {/* Timestamp */}
                            <p className="text-xs text-slate-600 mb-3">
                              {item.createdAt}
                            </p>

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleCopy(item.shortUrl, item.id)}
                                className="flex-1 flex items-center justify-center space-x-1 px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 rounded-md transition text-xs text-slate-300"
                              >
                                {copiedId === item.id ? (
                                  <>
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>

                              <a
                                href={item.shortUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 rounded-md transition"
                                title="Open in new tab"
                              >
                                <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
                              </a>

                              <button
                                onClick={() => handleDelete(item.id)}
                                className="flex items-center justify-center px-3 py-1.5 bg-red-900/20 hover:bg-red-900/40 rounded-md transition"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-red-400" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              // Collapsed state - show icons only
              <div className="flex flex-col items-center space-y-4 mt-4 px-2">
                {urlHistory.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="p-2 rounded-md hover:bg-slate-800/50 cursor-pointer transition"
                    title={item.shortUrl}
                  >
                    <Link2 className="w-5 h-5 text-slate-400" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Stats */}
          {isOpen && urlHistory.length > 0 && (
            <div className="p-3 sm:p-4 border-t border-white/5">
              <div className="bg-slate-800/40 rounded-lg p-3 text-center">
                <p className="text-xs text-slate-500">Total URLs</p>
                <p className="text-2xl font-bold text-slate-300 mt-1">
                  {urlHistory.length}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 flex-col">
          {/* URL Generator Card */}
          <div className="w-full max-w-2xl">
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-slate-700/50 p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-100 mb-2 text-center">
                Shorten Your URL
              </h2>
              <p className="text-sm text-slate-400 text-center mb-6">
                Enter a long URL to generate a short, shareable link
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  ref={urlRef}
                  type="text"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-600 focus:border-slate-600 transition-all"
                  placeholder="https://example.com/very/long/url"
                />
                <button
                  onClick={handleGenerateURL}
                  disabled={loading}
                  className="w-full sm:w-auto px-6 py-3 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-slate-100 font-medium rounded-lg transition-all text-sm whitespace-nowrap"
                >
                  {loading ? "Generating..." : "Shorten URL"}
                </button>
              </div>
            </div>

            {/* Result Display */}
            {shortUrl && (
              <div className="mt-4 bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 animate-fadeIn">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Check className="w-5 h-5 text-green-400" />
                    </div>
                    <span className="text-sm font-medium text-slate-300">URL Shortened Successfully!</span>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4 mb-3">
                  <p className="text-xs text-slate-500 mb-1">Your shortened URL</p>
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-300 hover:text-slate-200 break-all text-sm"
                  >
                    {shortUrl}
                  </a>
                </div>

                <button
                  onClick={() => handleCopy(shortUrl, 'result')}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all text-sm font-medium text-slate-100"
                >
                  {copiedId === 'result' ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy to Clipboard</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
