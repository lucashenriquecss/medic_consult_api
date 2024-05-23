
import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
    service:"",// ex: gmail
    auth:{
        user:"", //email
        pass:"" //token
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
            from: `"Medic" <emailcolocar>`,
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

