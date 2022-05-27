import dotenv from "dotenv";
import yargs from "yargs";

dotenv.config();

const args = yargs(process.argv.slice(2));
const processedArgs = args.options({
  port: {
    alias: "p",
    default: process.env.PORT || 8080,
    describe: "Port to listen",
    type: "number",
  },
}).argv;

export default {
  PORT: processedArgs.port,
  EMAIL: process.env.EMAIL,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER: process.env.TWILIO_NUMBER,
  VERIFIED_NUMBER: process.env.VERIFIED_NUMBER,
  URL_BASE: process.env.URL_BASE,
  JWT_SECRET: process.env.JWT_SECRET,
  mongodb: {
    cnxStr: process.env.MONGODB_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    },
  },
};
