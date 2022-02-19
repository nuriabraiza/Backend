const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const app = express();
const apiRouter = require("./routes/productos.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//handlebars settings
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
app.set("views", "./views/");

app.use("/", apiRouter);
app.use(express.static("public"));

const PORT = 8080;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server on port http://localhost:${PORT}`);
  }
});
