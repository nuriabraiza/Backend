const express = require("express");
const app = express();
const path = require("path");
const Producto = require("./services/product.service");
const apiRouter = require("./routes/products.routes");
let { Server: HttpServer } = require("http");
let { Server: SocketIO } = require("socket.io");
const moment = require("moment");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", apiRouter);
app.use(express.static("public"));

app.get("/", (req, res, next) => {
  res.render("index", {});
});

let http = new HttpServer(app);
let io = new SocketIO(http);

const messages = [
  { author: "Juan", text: "¡Hola! que tal?" },
  { author: "Pedro", text: "Muy bien y vos?" },
  { author: "Ana", text: "Genial!" },
];

io.on("connection", (socket) => {
  console.log("usuario conectado");

  emitMessages();

  socket.on("new-message", function (dato) {
    dato.date = moment().format("LLLL");
    messages.push(dato);
    io.sockets.emit("mensajes", messages);
  });
});
const emitMessages = () => io.sockets.emit("mensajes", messages);

const PORT = 8080;

http.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listening on http://localhost:${PORT}`);
  }
});
