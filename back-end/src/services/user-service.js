import { UserModel } from "../models/user-schema.js";
import bcrypt from 'bcryptjs';

export const registerUser = async (userObject) => {
    try {
        // Hash password before saving
        const hashedPassword = await bcrypt.hash(userObject.password, 10);
        const doc = await UserModel.create({
            ...userObject,
            password: hashedPassword
        });
        // Don't send password back
        const { password, ...userWithoutPassword } = doc.toObject();
        return userWithoutPassword;
    }
    catch (err){
        throw err;
    }
}

export const loginUser = async (userObject) => {
    try {
        const user = await UserModel.findOne({ email: userObject.email }).exec();
        if (!user) {
            throw new Error('User not found');
        }

        const isValidPassword = await bcrypt.compare(userObject.password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid password');
        }

        // Don't send password back
        const { password, ...userWithoutPassword } = user.toObject();
        return userWithoutPassword;
    }
    catch (err){
        throw err;
    }
}