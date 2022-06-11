import bCrypt from "bcrypt";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import logger from "../services/external/logging.js";

const filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(filename);

export const returnMessage = (
  isError,
  code,
  message,
  payload,
  error = undefined
) => {
  if (code >= 500) {
    logger.error(`${message} ${error || ""}`);
  } else if (code >= 400) {
    logger.warn(message);
  }
  return {
    status: isError ? "error" : "success",
    code,
    message,
    payload,
  };
};

export const deleteImage = async (image) => {
  const filePath = __dirname + "/../../public" + image;
  if (image && fs.existsSync(filePath)) {
    fs.promises.unlink(filePath);
  } else {
    logger.error("No se pudo eliminar la imagen: " + filePath);
  }
};

export const filePath = (filename) => {
  return `/images/${filename}`;
};

export const toObj = (obj) => JSON.parse(JSON.stringify(obj));

export const renameField = (record, from, to) => {
  record[to] = record[from];
  delete record[from];
  return record;
};
export const removeField = (record, field) => {
  const value = record[field];
  delete record[field];
  return value;
};

export function createHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

export function isValidPassword(user, password) {
  return bCrypt.compareSync(password, user.payload.password);
}

export const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["JWT_COOKIE"];
  }
  return token;
};
