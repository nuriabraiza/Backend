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
  mode: {
    alias: "m",
    default: "fork",
    describe: "Mode to run the server",
    type: "string",
    choices: ["fork", "cluster"],
  },
}).argv;

export default {
  PORT: processedArgs.port,
  MODE: processedArgs.mode,
  mongodb: {
    cnxStr: process.env.MONGODB_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    },
  },
};
