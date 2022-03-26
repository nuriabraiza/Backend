import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    productos: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export default cartSchema;
