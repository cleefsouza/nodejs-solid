import { MailProviderInterface, MessageInterface } from '../MailProviderInterface';
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer';

export class MailTrapMailProvider implements MailProviderInterface {
    private transporter: Mail;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: '',
                pass: ''
            }
        });
    }

    async sendMail(message: MessageInterface): Promise<void> {
        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email
            },
            from: {
                name: message.from.name,
                address: message.from.email
            },
            subject: message.subject,
            html: message.body,
        })
    }

};