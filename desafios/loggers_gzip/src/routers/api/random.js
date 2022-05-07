import { fork } from "child_process";
import { Router } from "express";

const randomApiRouter = new Router();

randomApiRouter.get("/random", (req, res) => {
  const cant = parseInt(req.query.cant || 100000000);
  if (isNaN(cant)) {
    res.status(400).send({
      error: "Parameter 'cant' must be a number",
    });
    return;
  }
  const random = fork("./src/utils/random.js", [cant]);
  random.on("message", (data) => {
    res.json({
      pid: process.pid,
      port: process.argv[3],
      iterations: cant,
      numbers: data,
    });
  });
});

export default randomApiRouter;
