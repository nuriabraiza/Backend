const http = require("http");

const PORT = 3006;

const server = http.createServer((req, res) => {
  res.end("hola mundo");
});

const connectedServer = server.listen(PORT, () => {
  console.log(`Servidor Http escuchando en el puerto http://localhost:${PORT}`);
});
