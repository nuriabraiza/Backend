const MessageService = require("../services/mensajes");

module.exports = class Mensaje {
	constructor() {}

	nuevoMensaje(user, text) {
		const mensajes = new MessageService();
		return mensajes.create(user, text);
	}

	mostrarMensajes() {
		const mensajes = new MessageService();
		return mensajes.read();
	}
};
