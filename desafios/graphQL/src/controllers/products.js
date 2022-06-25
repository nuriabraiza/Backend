import { productService } from "../services/services.js";
import { deleteImage, filePath, returnMessage } from "../utils/functions.js";

const getProducts = async (req, res) => {
  const result = await productService.getAll();
  res.status(result.code).json(result);
};

const getProductById = async (req, res) => {
  const id = req.params.id;
  const result = await productService.getOneById(id);
  res.status(result.code).json(result);
};

const createProduct = async (req, res) => {
  const product = req.body;
  const file = req.file;

  if (file) {
    const thumbnail = filePath(file.filename);
    product.thumbnail = thumbnail;
  } else {
    res
      .status(400)
      .json(returnMessage(true, 400, "Error al subir la imagen", null));
    return;
  }

  if (!product.title) {
    await deleteImage(product.thumbnail);
    res
      .status(400)
      .json(returnMessage(true, 400, "El titulo es requerido", null));
    return;
  }

  if (!product.description) {
    await deleteImage(product.thumbnail);
    res
      .status(400)
      .json(returnMessage(true, 400, "La descripcion es requerida", null));
    return;
  }

  if (!product.code) {
    await deleteImage(product.thumbnail);
    res
      .status(400)
      .json(returnMessage(true, 400, "El codigo es requerido", null));
    return;
  }

  if (!product.stock) {
    await deleteImage(product.thumbnail);
    res
      .status(400)
      .json(returnMessage(true, 400, "El stock es requerido", null));
    return;
  }

  if (!product.price) {
    await deleteImage(product.thumbnail);
    res
      .status(400)
      .json(returnMessage(true, 400, "El precio es requerido", null));
    return;
  }

  if (!product.thumbnail) {
    await deleteImage(product.thumbnail);
    res
      .status(400)
      .json(returnMessage(true, 400, "La imagen es requerida", null));
    return;
  }

  product.price = parseFloat(product.price);
  product.stock = parseInt(product.stock);

  const productWithSameCode = (await productService.getAll()).payload.find(
    (prod) => prod.code === product.code
  );
  if (productWithSameCode) {
    await deleteImage(product.thumbnail);
    res
      .status(400)
      .json(
        returnMessage(
          true,
          400,
          `Un producto con el mismo código (${product.code}) ya existe, ingrese otro`,
          null
        )
      );
    return;
  }
  const result = await productService.createOne(product);
  if (result.code <= 200 && result.code >= 300) {
    await deleteImage(product.thumbnail);
  }
  res.status(result.code).json(result);
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const product = req.body;
  const file = req.file;

  const pastThumbnail = (await productService.getOneById(id)).payload
    ?.thumbnail;
  if (pastThumbnail) {
    if (product.price) product.price = parseFloat(product.price);
    if (product.stock) product.stock = parseInt(product.stock);

    const productWithSameCode = (await productService.getAll()).payload.find(
      (prod) => prod.code === product.code && prod.id !== id
    );

    if (productWithSameCode) {
      if (file) {
        await deleteImage(filePath(file.filename));
      }
      res
        .status(400)
        .json(
          returnMessage(
            true,
            400,
            `Un producto con el mismo código (${product.code}) ya existe, ingrese otro`,
            null
          )
        );
      return;
    }

    if (file) {
      const thumbnail = filePath(file.filename);
      if (pastThumbnail) {
        await deleteImage(pastThumbnail);
      }
      product.thumbnail = thumbnail;
    }

    const result = await productService.updateOneById(id, product);
    res.status(result.code).json(result);
  } else {
    if (file) {
      const thumbnail = filePath(file.filename);
      await deleteImage(thumbnail);
    }
    res
      .status(400)
      .json(returnMessage(true, 400, "El producto no existe", null));
    return;
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const product = (await productService.getOneById(id)).payload;
  if (product) {
    await deleteImage(product.thumbnail);
    const result = await productService.deleteOneById(id);
    res.status(result.code).json(result);
    return;
  } else {
    res
      .status(400)
      .json(returnMessage(true, 400, "El producto no existe", null));
    return;
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
