import mongoose from "mongoose";
import Container from "../containers/Container.js";
import { deleteImage, filePath, returnMessage } from "../utils/functions.js";

class ProductsApi extends Container {
  constructor() {
    super(
      "products",
      new mongoose.Schema(
        {
          title: { type: String, required: true },
          description: { type: String, required: true },
          code: { type: String, required: true, unique: true },
          stock: { type: Number, required: true },
          price: { type: Number, required: true },
          thumbnail: { type: String, required: true },
        },
        { timestamps: true }
      ),
      "Producto"
    );
  }

  async createOne(product, file) {
    if (file) {
      const thumbnail = filePath(file.filename);
      product.thumbnail = thumbnail;
    } else {
      return returnMessage(true, 500, "Error al subir la imagen", null);
    }

    if (!product.title) {
      await deleteImage(product.thumbnail);
      return returnMessage(true, 400, "El titulo es obligatorio", null);
    }

    if (!product.description) {
      await deleteImage(product.thumbnail);
      return returnMessage(true, 400, "La descripcion es obligatoria", null);
    }

    if (!product.code) {
      await deleteImage(product.thumbnail);
      return returnMessage(true, 400, "El codigo es obligatorio", null);
    }

    if (!product.stock) {
      await deleteImage(product.thumbnail);
      return returnMessage(true, 400, "El stock es obligatorio", null);
    }

    if (!product.price) {
      await deleteImage(product.thumbnail);
      return returnMessage(true, 400, "El precio es obligatorio", null);
    }

    if (!product.thumbnail) {
      await deleteImage(product.thumbnail);
      return returnMessage(true, 400, "La imagen es obligatoria", null);
    }

    product.price = parseFloat(product.price);
    product.stock = parseInt(product.stock);

    const productWithSameCode = (await super.getAll()).payload.find(
      (prod) => prod.code === product.code
    );
    if (productWithSameCode) {
      await deleteImage(product.thumbnail);
      return returnMessage(
        true,
        400,
        `Un producto con el mismo código (${product.code}) ya existe, ingrese otro`
      );
    }
    const result = await super.createOne(product);
    if (result.code !== 200) {
      await deleteImage(product.thumbnail);
    }
    return result;
  }

  async updateOneById(id, product, file) {
    const pastThumbnail = (await super.getOneById(id)).payload?.thumbnail;
    if (pastThumbnail) {
      if (product.price) product.price = parseFloat(product.price);
      if (product.stock) product.stock = parseInt(product.stock);

      const productWithSameCode = (await super.getAll()).payload.find(
        (prod) => prod.code === product.code && prod.id !== id
      );

      if (productWithSameCode) {
        if (file) {
          await deleteImage(filePath(file.filename));
        }
        return returnMessage(
          true,
          400,
          `Un producto con el mismo código (${product.code}) ya existe, ingrese otro`
        );
      }

      if (file) {
        const thumbnail = filePath(file.filename);
        if (pastThumbnail) {
          await deleteImage(pastThumbnail);
        }
        product.thumbnail = thumbnail;
      }

      return await super.updateOneById(id, product);
    } else {
      if (file) {
        const thumbnail = filePath(file.filename);
        await deleteImage(thumbnail);
      }
      return returnMessage(true, 400, "El producto no existe", null);
    }
  }

  async deleteOneById(id) {
    const product = (await super.getOneById(id)).payload;
    if (product) {
      await deleteImage(product.thumbnail);
      return await super.deleteOneById(id);
    } else {
      return returnMessage(true, 400, "El producto no existe", null);
    }
  }
}

export default new ProductsApi();
