import { nanoid } from "nanoid";
import { addURL, getSmallToBig, getAllUrls as fetchAllUrls, updateUrlById, getUrlById } from "../services/url-service.js";

export const getBigUrl = async (req,res) => {
    // res.send('This will return the big URL');
    const {code} = req.params;
    console.log('Code: ', code);
    // res.json({message: `Redirecting to ${code}`});
    try {
        const doc = await getSmallToBig(code);
    if (doc && doc._id){
        res.redirect(doc.bigurl);
    }
    else {
        res.json({message: 'Invalid code'});
    }
    } catch (error) {
        console.error('Error occurred: ', error);
        res.json({error: 'Failed to get big URL', error});
    }
}

export const urlShort = async (req, res) => {
    const bigURL = req.body.bigurl;
    const email = req.user.email; // From auth middleware
    try {
                console.log('Big-url: ', bigURL);
                const num = nanoid(6);

                // Attempt to fetch the page and extract a <title> to use as a friendly label
                let label = undefined;
                try {
                    const resp = await fetch(bigURL, { method: 'GET', redirect: 'follow' });
                    if (resp && resp.ok) {
                        const text = await resp.text();
                        // quick title extraction
                        const match = text.match(/<title[^>]*>([^<]+)<\/title>/i);
                        if (match && match[1]) {
                            label = match[1].trim().slice(0, 200); // limit length
                        }
                    }
                } catch (err) {
                    console.warn('Failed to fetch page title:', err.message || err);
                }

                const doc = await addURL({email, shortid: num, bigurl: bigURL, label});
        if (doc && doc._id){
            res.json({shortUrl: process.env.BASE_URL+'small/' + num});
        }
        else {
            res.status(400).json({error: 'Failed to shorten URL'});
        }
    } catch (error) {
        console.error('Error occurred: ', error);
        res.status(500).json({error: 'Failed to shorten URL'});
    }
}

export const getAllUrls = async (req, res) => {
    try {
        const email = req.user.email; // From auth middleware
        const docs = await fetchAllUrls(email);
        res.json(docs);
    } catch (error) {
        console.error('Failed to get urls:', error);
        res.status(500).json({ error: 'Failed to get urls' });
    }
}

export const updateUrl = async (req, res) => {
    try {
        const { id } = req.params;
        const { label } = req.body;
        if (!id) return res.status(400).json({ error: 'Missing id' });
    // Verify ownership: ensure the doc belongs to req.user.email
    const existing = await getUrlById(id);
    if (!existing) return res.status(404).json({ error: 'URL not found' });
    if (existing.email !== req.user.email) return res.status(403).json({ error: 'Forbidden' });
    const updated = await updateUrlById(id, { label });
        if (!updated) return res.status(404).json({ error: 'URL not found' });
        res.json({ success: true, data: updated });
    } catch (error) {
        console.error('Failed to update url:', error);
        res.status(500).json({ error: 'Failed to update url' });
    }
}