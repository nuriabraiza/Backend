//falta conexion con html a traves de EJS por eso no funciona

const express = require("express");
let app = express();
let moment = require("moment");
let path = require("path");
const apiRouter = require("./routes/products.routes.js");
let { Server: HttpServer } = require("http");
let { Server: SocketIO } = require("socket.io");
const PORT = 3000;

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
let usuarios = [];
let users = [];
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado:", socket.id);
  socket.emit("init", { usuarios, users });
  socket.on("from_front", (data) => {
    let length_user = false;
    if (usuarios.length > 0) length_user = true;
    if (length_user) {
      if (auth(data, socket.id)) {
        users.push({ email: data.email, id: socket.id, status: "active" });
        usuarios.push({
          ...data,
          id: socket.id,
          date: moment().format("HH:mm DD-MM-YYYY"),
        });
        io.sockets.emit("fill_message", usuarios);
      } else {
        socket.emit("error", `El usuario ${data.email} ya está en uso`);
      }
    } else {
      users.push({ email: data.email, id: socket.id, status: "active" });
      usuarios.push({
        ...data,
        id: socket.id,
        date: moment().format("HH:mm DD-MM-YYYY"),
      });
      io.sockets.emit("fill_message", usuarios);
    }
  });
});

let auth = (data, socket_id) => {
  let est = usuarios.find((usuario) => usuarios.id == socket_id);
  console.log(est);
  if (!est) return true;
  if (est.length > 0) return true;

  let email = usuarios.find((usuario) => usuarios.email == data.email);
  if (!email) return true;
  if (email.length > 0) return false;

  return true;
};

http.listen(PORT, (err) => {
  console.log(`Server on http://localhost:${PORT}`);
});
