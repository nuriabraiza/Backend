import mongoose from "mongoose";
import Container from "../containers/Container.js";

class UsersApi extends Container {
  constructor() {
    super(
      "users",
      new mongoose.Schema({
        id: { type: String, required: true },
        name: { type: String, required: true },
        lastname: { type: String, required: true },
        age: { type: Number, required: true, default: 0 },
        alias: { type: String, required: true, unique: true },
        avatar: {
          type: String,
          required: true,
          default: "https://avatars.dicebear.com/api/identicon/default.png",
        },
        text: { type: String, required: true },
      }),
      "Usuario"
    );
  }
}

export default new UsersApi();
