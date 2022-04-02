const express = require("express");
const config = require("./config/config.json");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require("./routes/product_route");
app.use("/api", router);

app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).send("Algo se rompio!");
});

const PORT = process.env.PORT || config.PORT;

const server = app.listen(PORT, () => {
  console.log(`servidor escuchando en http://localhost:${PORT}`);
});

server.on("error", (error) => {
  console.log("error en el servidor:", error);
});
