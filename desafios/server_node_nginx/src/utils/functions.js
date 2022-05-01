import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(filename);

export const returnMessage = (isError, code, message, payload) => {
  return {
    status: isError ? "error" : "success",
    code,
    message,
    payload,
  };
};

export const deleteImage = async (image) => {
  const filePath = __dirname + "/../../public/images/" + image.split("/")[4];
  if (image && fs.existsSync(filePath)) {
    fs.promises.unlink(filePath);
  }
};

export const filePath = (filename) => {
  const urlBase =
    process.env.URL_BASE || "http://localhost:" + process.env.PORT || 8080;
  return `${urlBase}/images/${filename}`;
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
