import { buildSchema } from "graphql";
import Products from "../../dao/models/Product";
let productos = new Products();

export let schema = buildSchema(`
type Producto {
    _id: String,
 	title: String,
    price: Int,
    thumbnail: String,
    _v: Int
},
type Query {
	producto: [Producto]
    productoPorID (_id: String): [Producto]
}
type Mutation {
    guardarProducto (title: String, price: Int, thumbnail: String): Producto
}
`);

const generaListaProds = async () => {
  let productoData = await productos.listarAll();
  return productoData;
};

const productoPorID = async (id) => {
  let productoPorID = await productos.listar(id);
  return productoPorID;
};

const guardarProducto = async ({ title, price, thumbnail }) => {
  let prod = { title, price, thumbnail };
  let nuevoProd = await productos.guardar(prod);
  return nuevoProd;
};

export const resolvers = {
  producto: generaListaProds,
  productoPorID: productoPorID,
  guardarProducto: guardarProducto,
};
