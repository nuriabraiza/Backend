import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

export default productSchema;
