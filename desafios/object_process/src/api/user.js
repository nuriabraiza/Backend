import mongoose from "mongoose";
import Container from "../containers/Container.js";

class UsersApi extends Container {
  constructor() {
    super(
      "users",
      new mongoose.Schema(
        {
          name: { type: String, required: true },
          surname: { type: String, required: true },
          age: { type: Number, required: true, default: 0 },
          alias: { type: String, required: true, unique: true },
          avatar: {
            type: String,
            required: true,
            default: "https://avatars.dicebear.com/api/identicon/default.png",
          },
          email: { type: String, required: true, unique: true },
          password: { type: String },
        },
        { timestamps: true }
      ),
      "Usuario"
    );
  }
}

export default new UsersApi();
