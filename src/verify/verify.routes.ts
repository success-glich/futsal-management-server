

import express, { Request, Response } from "express";
import httpStatus from "http-status";
import { authService } from "../auth";

export class VerifyRoutes{
    public router:express.Router;
    constructor(){
        this.router = express.Router();
        this.routes();
    }
    public routes(){

       this.router.post("/verify-otp",async(req:Request,res:Response)=>{
            try {
                const {otp,email} =req.body;
        
                if(!otp || !email) return res.status(httpStatus.BAD_REQUEST).json({message:"invalid request."});
        
                const user = await authService.findByEmail(email as string);
                if(user?.verified){
                    return res.status(httpStatus.BAD_REQUEST).json({message:"user already verified."});
                }
        
                if(!user) return res.status(httpStatus.NOT_FOUND).json({message:"user not found."});
                
                if(user.email_verify_token !== otp) return res.status(httpStatus.BAD_REQUEST).json({message:"invalid otp."});
        
                await authService.update(user.uuid,{verified:true,email_verify_token:null,email_verified_at:new Date()});
                res.status(httpStatus.OK);
                return res.json({message:"Email verified successfully."});
        
            } catch (error) {
                return res.json({message:"Internal server error"});
        
            }
        
        });
    }
}