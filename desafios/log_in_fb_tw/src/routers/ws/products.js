import productsApi from "../../api/products.js";

export default async function configurarSocket(socket, sockets) {
  socket.emit("productos", await productsApi.getAll());

  socket.on("update", async (producto) => {
    await productsApi.guardar(producto);
    sockets.emit("productos", await productsApi.getAll());
  });
}
