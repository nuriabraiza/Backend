const express = require("express");

const path = require("path");
const app = express();
const apiRouter = require("./routes/products.routes.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("ejs", require("ejs").__express);

app.set("views", "./views/");
app.set("view engine", "ejs");

app.use("/", apiRouter);
app.use(express.static("public"));

const PORT = 3004;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server on port http://localhost:${PORT}`);
  }
});
