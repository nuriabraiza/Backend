import { Router } from "express";
import os from "os";
import path from "path";
import { webAuth } from "../../auth/index.js";

const homeWebRouter = new Router();

homeWebRouter.get("/home", webAuth, (req, res) => {
  res.render(path.join(process.cwd(), "/views/pages/index.ejs"), {
    name: req.session.name,
    id: req.session.userId,
  });
});

homeWebRouter.get("/info", (req, res) => {
  const info = {
    argv: process.argv,
    execPath: process.execPath,
    platform: process.platform,
    processId: process.pid,
    version: process.version,
    projectDir: process.cwd(),
    reservedMemory: process.memoryUsage().rss,
    numProcessors: os.cpus().length,
  };
  res.send(info);
});

export default homeWebRouter;
