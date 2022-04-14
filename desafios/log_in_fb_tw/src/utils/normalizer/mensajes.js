import { normalize, schema } from "normalizr";

const userEntity = new schema.Entity("user", {}, { idAttribute: "_id" });
const messageEntity = new schema.Entity("message", { user: userEntity });
const messageListEntity = new schema.Entity("messageList", {
  messages: [messageEntity],
});

const normalizeMessages = (messages) =>
  normalize({ id: "messages", messages: messages }, messageListEntity);

export { normalizeMessages };
