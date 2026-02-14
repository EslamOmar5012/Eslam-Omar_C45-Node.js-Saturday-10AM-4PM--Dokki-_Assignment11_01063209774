import nodemailer from 'nodemailer';
import { envVars } from '../../../config/index.js';

export const sendEmail = async ({ to, subject, html }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: envVars.email.user,
            pass: envVars.email.pass,
        },
    });

    const mailOptions = {
        from: `"Saraha App" <${envVars.email.user}>`,
        to,
        subject,
        html,
    };

    return await transporter.sendMail(mailOptions);
};
