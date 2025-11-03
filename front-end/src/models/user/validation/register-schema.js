import {z} from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, "Name should be at least 3 characters").max(20, "Name should be less than 20 characters"),
    email: z.string().email("Invalid Email address"),
    password: z.string().min(6, "Password should be more than 8 characters").max(20, "Password should be less than 20 characters")
});
