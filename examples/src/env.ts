import * as dotenv from "dotenv";
dotenv.config();

export const env = {
  username: process.env.SMS_USERNAME!,
  password: process.env.SMS_PASSWORD!,
  url: process.env.SMS_URL || "https://bulksms.dhiraagu.com.mv/partners/xmlMessage.jsp",
};
