import path from "path";
import { ZodError } from "zod";
import ejs from "ejs";

export const formatError = (err:ZodError):any=>{
        let errors:any = {};
        err.errors?.forEach((issues)=>{
            errors[issues.path[0]] = issues.message;
        });

    return errors
}

export const renderEmailEjs = async (filename:string,payload:any):Promise<string>=>{
    const location = path.join( __dirname, `/../views/emails/${filename}.ejs`);

    const html:string =await ejs.renderFile(location,payload);

    return html;

}
export const generateOTP = (length=6)=>{
    let otp = "";
    for(let i=0; i<length; i++){
        otp+=Math.floor(Math.random()*10)+1;
    }
    return otp;
}