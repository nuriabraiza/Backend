const express = require("express");

const path = require("path");
const app = express();
const apiRouter = require("./routes/productos.routes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("pug", require("pug").__express);

app.set("views", "./views/");
app.set("view engine", "pug");

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
