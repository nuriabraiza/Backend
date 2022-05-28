import { cartService, productService } from "../services/services.js";
import { returnMessage } from "../utils/functions.js";

const getCarts = async (req, res) => {
  const result = await cartService.getAll();
  const cartsIds = result.payload
    ? result.payload.map((product) => product.id)
    : [];
  res
    .status(200)
    .json(returnMessage(false, 200, "Carritos encontrados", cartsIds));
};

const createCart = async (req, res) => {
  const result = await cartService.createOne({
    productos: [],
    userId: req.user.id,
  });
  res.status(result.code).json(result);
};

const deleteCart = async (req, res) => {
  const result = await cartService.deleteOneById(req.params.id);
  res.status(result.code).json(result);
};

const checkout = async (_, res) => {
  res.status(200).json(returnMessage(false, 200, "Pedido realizado", null));
};

const getProducts = async (req, res) => {
  const id = req.params.id;
  const cart = await cartService.getOneById(id);
  if (cart.code !== 200) {
    res.status(cart.code).json(cart);
  } else {
    res
      .status(cart.code)
      .json(
        returnMessage(
          false,
          200,
          "Productos encontrados",
          cart.payload.productos
        )
      );
  }
};

const addProduct = async (req, res) => {
  const id = req.params.id;
  const product = (await productService.getOneById(req.body.productoId))
    .payload;
  const cart = await cartService.getOneById(id);
  if (cart.code !== 200) {
    res.status(cart.code).json(cart);
    return;
  }
  const cartPayload = cart.payload;
  if (!product) {
    res
      .status(404)
      .json(returnMessage(true, 404, "Producto no encontrado", null));
    return;
  }

  const productFound = cartPayload.productos.find(
    (prod) => prod.id === product.id
  );
  let amount = 1;
  if (productFound) {
    productFound.amount += amount;
  } else {
    cartPayload.productos.push({ ...product, amount });
  }

  const result = await cartService.updateOneById(id, cartPayload);
  res.status(result.code).json(result);
};

const deleteProductFromCart = async (req, res) => {
  const cartId = req.params.id;
  const productId = req.params.productId;

  const cart = await cartService.getOneById(cartId);
  if (cart.code !== 200) {
    res.status(cart.code).json(cart);
    return;
  }

  const product = cart.payload.productos.find(
    (product) => product.id === productId
  );
  if (product === undefined) {
    res
      .status(404)
      .json(returnMessage(true, 404, "Producto no encontrado", null));
    return;
  }

  cart.payload.productos = cart.payload.productos.filter(
    (product) => product.id !== productId
  );

  const result = await cartService.updateOneById(cartId, cart.payload);
  res.status(result.code).json(result);
};

export default {
  getCarts,
  createCart,
  deleteCart,
  checkout,
  getProducts,
  addProduct,
  deleteProductFromCart,
};
