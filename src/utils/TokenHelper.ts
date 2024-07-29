import { token } from "morgan";
import { config } from "../config/config";
import jwt from "jsonwebtoken";

interface Payload {
    [key: string]: any;
  }
  
export const TokenHelper ={
    generateToken:async (payload:Payload,options={expiresIn:config.jwtTokenExpireTime}):Promise<string>=>{
        return new Promise((resolve,reject)=>{
            jwt.sign(payload,config.jwtSecret,options,(err,token)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(token as string);
                }
            });
            
        });
    },
    verifyToken:async(token:string):Promise<Payload>=>{
        return new Promise((resolve,reject)=>{
            jwt.verify(token,config.jwtSecret,(err, decoded)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(decoded as Payload);
                }
            });
        });
    }
}