
import nodemailer from "nodemailer";
import { config } from "../config/config";

const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: false, 
    auth: {
      user: config.smtpUser,
      pass:config.smtpPassword,
    },
  });

 
export async function sendEmail(to:string,subject:string,body:string) {
   
    const info = await transporter.sendMail({
      from: config.fromEmail, 
      to: to, 
      subject: subject, 
      html: body, 
    });
  
    console.log("Message sent: %s", info.messageId);

  }