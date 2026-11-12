import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { config } from "dotenv";

config();

const MAILERSEND_API_KEY = process.env.MAILERSEND_API_KEY || "";
const EMAIL_FROM = process.env.EMAIL_FROM || "";

const mailerSend = new MailerSend({
  apiKey: MAILERSEND_API_KEY,
});

export const sendEmail = async (
  to: string,
  subject: string,
  htmlContent: string,
  textContent: string
): Promise<void> => {
  const sentFrom = new Sender(EMAIL_FROM, "ISOlytics");
  const recipients = [new Recipient(to, "Recipient Name")];
  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject(subject)
    .setHtml(htmlContent)
    .setText(textContent);

  await mailerSend.email.send(emailParams);
};
