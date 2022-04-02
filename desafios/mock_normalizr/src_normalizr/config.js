import __dirname from "./utils/utils.js";
import dotenv from "dotenv";
dotenv.config();

const config = {
  fileSystem: {
    baseUrl: `${__dirname}/files/`,
  },
  mongo: {
    baseUrl: process.env.MONGO_DB_URL,
  },
  firebase: {
    serviceAccount: {
      type: process.env.TYPE,
      project_id: process.env.PROJECT_ID,
      private_key_id: process.env.PRIVATE_KEY_ID,
      private_key: process.env.PRIVATE_KEY,
      client_email: process.env.CLIENT_EMAIL,
      client_id: process.env.CLIENT_ID,
      auth_uri: process.env.AUTH_URI,
      token_uri: process.env.TOKEN_URI,
      auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509,
      client_x509_cert_url: process.env.CLIENT_X509,
    },
    baseUrl: process.env.FIREBASE_URL,
  },
};

export default config;
