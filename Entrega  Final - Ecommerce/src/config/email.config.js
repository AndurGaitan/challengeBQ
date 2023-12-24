import nodemailer from 'nodemailer'
import config from "../config/config.js";

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.gmailKey,
        pass: config.gmail
    }
})

export default transport