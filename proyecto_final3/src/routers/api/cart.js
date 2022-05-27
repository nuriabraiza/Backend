import { Router } from "express";
import cartApi from "../../api/carts.js";
import productsApi from "../../api/products.js";
import { checkAuthorization } from "../../auth/index.js";
import config from "../../config.js";
import { sendMail } from "../../services/mailer.js";
import { passportCall } from "../../services/passport-config.js";
import twilioClient from "../../services/twilio.js";
import { returnMessage } from "../../utils/functions.js";

const cartApiRouter = Router();

cartApiRouter.get(
  "/",
  passportCall("jwt"),
  checkAuthorization(["admin", "user"]),
  async (_, res) => {
    const result = await cartApi.getAll();
    const cartsIds = result.payload
      ? result.payload.map((product) => product.id)
      : [];
    res
      .status(200)
      .json(returnMessage(false, 200, "Carritos encontrados", cartsIds));
  }
);

cartApiRouter.post(
  "/",
  passportCall("jwt"),
  checkAuthorization(["admin", "user"]),
  async (req, res) => {
    const cart = await cartApi.createOne(req.user.id);
    res.status(cart.code).json(cart);
  }
);

cartApiRouter.delete(
  "/:id",
  passportCall("jwt"),
  checkAuthorization(["admin", "user"]),
  async (req, res) => {
    const id = /^\d+$/.test(req.params.id)
      ? parseInt(req.params.id)
      : req.params.id;
    const cart = await cartApi.deleteOneById(id);
    res.status(cart.code).json(cart);
  }
);

cartApiRouter.delete(
  "/:id",
  passportCall("jwt"),
  checkAuthorization(["admin", "user"]),
  async (req, res) => {
    const id = /^\d+$/.test(req.params.id)
      ? parseInt(req.params.id)
      : req.params.id;
    const cart = await cartApi.deleteOneById(id);
    res.status(cart.code).json(cart);
  }
);

cartApiRouter.post(
  "/:id/checkout",
  passportCall("jwt"),
  checkAuthorization(["admin", "user"]),
  async (req, res) => {
    const id = /^\d+$/.test(req.params.id)
      ? parseInt(req.params.id)
      : req.params.id;
    const cart = await cartApi.getOneById(id);
    if (cart.code === 200) {
      const products = [];
      for (const product of cart.payload.productos) {
        const productResult = await productsApi.getOneById(product.id);
        if (productResult.code === 200) {
          products.push({ ...productResult.payload, amount: product.amount });
        }
      }
      if (products.length !== 0) {
        sendMail(
          config.EMAIL,
          "Nuevo pedido de " + req.user.username + " | " + req.user.email,
          generateProductsHtml(products)
        );
        twilioClient.messages
          .create({
            body:
              "Nuevo pedido de " + req.user.username + " | " + req.user.email,
            from: `whatsapp:${config.TWILIO_NUMBER}`,
            to: `whatsapp:${config.VERIFIED_NUMBER}`,
          })
          .then((message) => console.log(message.sid))
          .done();
        sendMail(
          req.user.email,
          "Su pedido esta siendo procesado | Ecommerce Coder House",
          "Su pedido esta siendo procesado. En breve recibira un correo de confirmacion. Gracias por su compra.<br><br>Ecommerce Coder House"
        );
      }
    }
    res.status(200).json(returnMessage(false, 200, "Pedido realizado", null));
  }
);

cartApiRouter.get(
  "/:id/productos",
  passportCall("jwt"),
  checkAuthorization(["admin", "user"]),
  async (req, res) => {
    const id = /^\d+$/.test(req.params.id)
      ? parseInt(req.params.id)
      : req.params.id;
    const cart = await cartApi.getOneById(id);
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
  }
);

cartApiRouter.post(
  "/:id/productos",
  passportCall("jwt"),
  checkAuthorization(["admin", "user"]),
  async (req, res) => {
    const id = /^\d+$/.test(req.params.id)
      ? parseInt(req.params.id)
      : req.params.id;
    const productsIds = req.body.productos.map((id) =>
      /^\d+$/.test(id) ? parseInt(id) : id
    );
    const products = (await productsApi.getListByIds(productsIds)).payload;
    const result = await cartApi.addProducts(id, products);
    res.status(result.code).json(result);
  }
);

cartApiRouter.delete(
  "/:id/productos/:productId",
  passportCall("jwt"),
  checkAuthorization(["admin", "user"]),
  async (req, res) => {
    const id = /^\d+$/.test(req.params.id)
      ? parseInt(req.params.id)
      : req.params.id;
    const productId = /^\d+$/.test(req.params.productId)
      ? parseInt(req.params.productId)
      : req.params.productId;
    const cart = await cartApi.deleteProduct(id, productId);
    res.status(cart.code).json(cart);
  }
);

export default cartApiRouter;

function generateProductsHtml(products) {
  let html = "<table>";
  products.forEach((product) => {
    html += `<ul>
    <li>
    <p>Producto: ${product.title}</p>
    <p>Precio unitario: $${product.price}</p>
    <p>Cantidad: ${product.amount}</p>
    <p>Total: $${product.price * product.amount}</p>
    </ul>`;
  });
  html += "</table>";
  return html;
}
