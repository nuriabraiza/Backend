import dotenv from "dotenv";
import yargs from "yargs";

dotenv.config();

const args = yargs(process.argv.slice(2));
const processedArgs = args.options({
  port: {
    alias: "p",
    default: 8080,
    describe: "Port to listen",
    type: "number",
  },
}).argv;

export default {
  PORT: processedArgs.port,
  mongodb: {
    cnxStr: process.env.MONGODB_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    },
  },
};
