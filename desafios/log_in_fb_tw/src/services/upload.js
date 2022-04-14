import multer from "multer";
import { __dirname } from "../utils/functions.js";

const storage = multer.diskStorage({
  destination: __dirname + "/../../public/images",
  filename: (_, file, cb) => {
    cb(null, Date.now() + "." + file.mimetype.split("/")[1]);
  },
});

const upload = multer({
  storage: storage,
  fileFilter(_, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(
        JSON.stringify({
          status: "error",
          message:
            "Por favor, suba una imagen con un formato soportado (jpg, jpeg, png y gif)",
          payload: null,
        })
      );
    }
    cb(null, true);
  },
});

export default upload;
