
import * as nodemailer from 'nodemailer';
import { config } from 'dotenv';
config();
let transporter = nodemailer.createTransport({
    service: process.env.SECRET_SERVICE_NOTIFICATION,
    host: process.env.SECRET_SMTP_NOTIFICATION,
    port: 587,
    auth:{
        user: process.env.SECRET_MAIN_NOTIFICATION, //email
        pass: process.env.SECRET_PASS_NOTIFICATION //token
    }
});

export  class sendMailDTO  {
    readonly to:string;
    readonly subject:string;
    readonly body:string;
    readonly cc ?: string;
    readonly bcc?: string;
    readonly attachments ?: string;
}

export const sendMail = async (sendMailDTO : sendMailDTO) =>{
    try {
        
        const email = {
            from: `"Medic" <${process.env.SECRET_MAIN_NOTIFICATION}>`,
            // replyTo: ,
            subject: sendMailDTO.subject,
            to: sendMailDTO.to,
            html: sendMailDTO.body,
            date: new Date(),
        }
        await transporter.sendMail(email);

    } catch (error) {
        console.log(error);
    }
}

