const express = require("express");
const app = express();
const path = require("path");
const Producto = require("./src/services/product.service");
const apiRouter = require("./src/routes/productos.routes");
const server = require("http").Server(app);
const io = require("socket.io")(server);
const moment = require("moment");
const { engine } = require("express-handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", apiRouter);
app.use("/static", express.static("/public"));
app.set("views", path.join(__dirname, "views"));

app.use("/public", express.static(__dirname + "/public"));

// Motor de plantilla
app.engine(
  "handlebars",
  engine({
    extname: "hbs",
    defaultLayout: "main.hbs",
    layoutsDir: path.resolve(__dirname, "./views/layouts"),
    partialsDir: path.resolve(__dirname, "./views/partials"),
  })
);
app.set("view engine", "handlebars");
app.set("views", "./views");

const messages = [
  { author: "Juan", text: "¡Hola! que tal?" },
  { author: "Pedro", text: "Muy bien y vos?" },
  { author: "Ana", text: "Genial!" },
];

io.on("connection", (socket) => {
  console.log("usuario conectado");

  //socket.on("producto", (data) => Producto.nuevoProducto(data));

  emitMessages();

  socket.on("new-message", function (dato) {
    dato.date = moment().format("LLLL");
    messages.push(dato);
    io.sockets.emit("mensajes", messages);
  });
});
const emitMessages = () => io.sockets.emit("mensajes", messages);

const PORT = 3002;

server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listening on http://localhost:${PORT}`);
  }
});
