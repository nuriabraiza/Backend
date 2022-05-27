import { createTransport } from "nodemailer";
import config from "../config.js";

const transporter = createTransport({
  host: "smtp.hostinger.com.ar",
  port: 587,
  secure: false,
  auth: {
    user: config.EMAIL,
    pass: config.EMAIL_PASSWORD,
  },
});

export const sendMail = (to, subject, html) => {
  return transporter.sendMail({
    from: config.EMAIL,
    to,
    subject,
    html,
  });
};
