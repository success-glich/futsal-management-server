import {z} from "zod";

export const loginSchema = z.object({
    email: z.string().email({message:"Please type correct email."}),
    password: z.string({message:"Password is required"}).min(6, {message:"Password must be 6 characters long."}).max(30),
});

export const registerSchema = z.object({
    name: z.string().min(3,{message:"Name Must be 3 character long"}).max(30),
    email: z.string().email({message:"Please type correct email."}),
    phone_number:z.string().min(10,{message:"Phone number must be 10 digits"}),
    password: z.string({message:"Password is required"}).min(6,{message:"Password must be 6 characters long."}).max(30),
    confirm_password: z.string().min(6,{message:"Confirm password must be 6 characters long."}).max(30),
}).refine((data)=>data.password === data.confirm_password,{
    message:"Password and Confirm Password must match.",
    path:["confirm_password"]
});
