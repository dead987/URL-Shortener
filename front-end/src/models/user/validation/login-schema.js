import {z} from "zod";

export const loginSchema =  z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password should be atleast 8 characters").max(20, "Password should be less than 20 characters")
});