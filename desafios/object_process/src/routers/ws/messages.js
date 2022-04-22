import messagesApi from "../../api/messages.js";
import { normalizeMessages } from "../../utils/normalizer/index.js";

export default async function configurarSocket(socket, sockets) {
  socket.emit(
    "messages",
    normalizeMessages((await messagesApi.getAll()).payload)
  );

  socket.on("sendMessage", async (mensaje) => {
    await messagesApi.createOne(mensaje);
    sockets.emit(
      "messages",
      normalizeMessages((await messagesApi.getAll()).payload)
    );
  });
}
