import { Router } from "express";
import {
  getAllProducts,
  getProductByPID,
  updateProduct,
  deleteProduct,
  saveProduct,
} from "../components/Products.js.js";

const APIProducts = Router();

APIProducts.get("/", getAllProducts);
APIProducts.get("/:pid", getProductByPID);

APIProducts.post(
  "/",
  authMiddleware,
  upload.single("thumbnail"),
  async (req, res) => {
    const product = req.body;
    if (req.file) {
      const thumbnail = filePath(req.file.filename);
      product.thumbnail = thumbnail;
      const result = await saveProduct;
    } else {
      return {
        status: "error",
        message: "No se ha podido subir la imagen",
        payload: null,
      };
    }
  }
);

APIProduct.put(
  "/:id",
  authMiddleware,
  upload.single("thumbnail"),
  async (req, res) => {
    const id = parseInt(req.params.id);
    const product = req.body;
    product.thumbnail = null;
    if (req.file) {
      const thumbnail = filePath(req.file.filename);
      product.thumbnail = thumbnail;
    }
    const result = await updateProduct;
  }
);

APIProduct.delete("/:id", authMiddleware, async (req, res) => {
  const id = parseInt(req.params.id);
  const result = deleteProduct;
});

export default APIProducts;
