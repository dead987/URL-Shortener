import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    'email': {type:String, required:true, unique:true},
    'password': {type:String, minLength: 6, required:true},
    'name': {type:String}
})
export const UserModel = mongoose.model('users', userSchema);