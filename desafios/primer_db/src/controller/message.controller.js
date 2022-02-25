const MessageService = require("../services/mensajes");

module.exports = class Message {
  constructor() {}

  newMsg(user, text) {
    const messages = new MessageService();
    return messages.create(user, text);
  }

  showMsg() {
    const messages = new MessageService();
    return messages.read();
  }
};
