import mongoose from "mongoose";
const { Schema } = mongoose;

const urlSchema = new Schema({
    'email': {type:String, required:true},
    'shortid': {type:String, minLength: 6, required:true, unique:true},
    'bigurl': {type:String},
    // optional friendly label/title fetched from the target page
    'label': {type:String}
})
export const urlModel = mongoose.model('urls', urlSchema);