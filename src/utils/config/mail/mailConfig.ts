import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const nodemailerConfig = {
  host: "smtp.gmail.com",
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
};

export default nodemailer.createTransport(nodemailerConfig);
