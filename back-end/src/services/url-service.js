import { urlModel } from "../models/url-schema.js";

export const getSmallToBig =async (code) => {
    const doc = await urlModel.findOne({shortid: code}).exec();
    return doc;
}

export const addURL = async (urlObject) => {
    try {
        const doc = await urlModel.create(urlObject);
        return doc;
        // console.log(doc);
    }
    catch (err){
        throw err;
    }
}

export const getAllUrls = async (email) => {
    try {
        const filter = email ? { email } : {};
        const docs = await urlModel.find(filter).sort({ _id: -1 }).exec();
        return docs;
    } catch (err) {
        throw err;
    }
}

export const updateUrlById = async (id, update) => {
    try {
        const doc = await urlModel.findByIdAndUpdate(id, { $set: update }, { new: true }).exec();
        return doc;
    } catch (err) {
        throw err;
    }
}

export const getUrlById = async (id) => {
    try {
        const doc = await urlModel.findById(id).exec();
        return doc;
    } catch (err) {
        throw err;
    }
}