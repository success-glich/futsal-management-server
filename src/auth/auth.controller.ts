import { NextFunction, Request, Response } from "express";
import { registerSchema } from "./auth.validation";
import {authService} from "./index";
import httpStatus from "http-status";
import { ApiResponse } from "../utils/apiResponse";
import { formatError, generateOTP, renderEmailEjs } from "../utils/helper";
import {v4 as uuidv4} from "uuid";
import { ZodError } from "zod";
import { render } from "ejs";
import { sendEmail } from "../utils/email";

export const AuthController ={
    register:async(req:Request,res:Response,next:NextFunction)=>{

        try {

            const body = req.body;
            const payload = registerSchema.parse(body);
            console.log(payload);
            const existingUser = await authService.findByEmail(payload.email);

            if(existingUser) return res.status(httpStatus.NOT_FOUND).json(new ApiResponse(httpStatus.NOT_FOUND,null,"User already exits.",false));

            const otp =  generateOTP();
            const emailBody = await renderEmailEjs('/verify-email',{name:payload.name,otp})
            await sendEmail(payload.email,"Verify email",emailBody);

            const uuid = uuidv4();

           const user = await authService.save({
            name:payload.name,
            email:payload.email,
            password:payload.password,
            phone_number:payload.phone_number,
            email_verify_token:otp,
            uuid
            });
        return res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, user, "User registered successfully.", true));
        } catch (err:any) {
            console.log('err',err);
            if(err instanceof ZodError){
                return res.status(422).json({
                 message:"Invalid data",
                 errors:formatError(err)
                });
             }
            // next(new Error(err));
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new ApiResponse(httpStatus.INTERNAL_SERVER_ERROR, null, "Internal server error.", false));
            
        }
       
    },
    login: async(req:Request,res:Response)=>{

    }
}