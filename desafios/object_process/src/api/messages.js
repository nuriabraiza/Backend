import mongoose from "mongoose";
import Container from "../containers/Container.js";

class MessagesApi extends Container {
  constructor() {
    super(
      "messages",
      new mongoose.Schema(
        {
          text: { type: String, required: true },
          user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        },
        { timestamps: true }
      ),
      "Mensaje"
    );
  }
}

export default new MessagesApi();
