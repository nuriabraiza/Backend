import twilio from "twilio";
import config from "../config.js";

const accountSid = config.TWILIO_ACCOUNT_SID;
const authToken = config.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

export default client;
