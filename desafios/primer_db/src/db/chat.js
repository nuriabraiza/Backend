const knex = require("knex");

class Chat {
  constructor(config) {
    this.knex = knex(config);
  }

  tableMsj() {
    return this.knex.schema.dropTableIfExists("mensajes").then(() => {
      return this.knex.schema.createTable("mensajes", (table) => {
        table.increments("id").primary();
        table.string("author").notNullable();
        table.string("text");
        table.string("date");
      });
    });
  }

  addMsj(mensaje) {
    return this.knex("mensajes").insert(mensaje);
  }

  getAllMsj() {
    return this.knex("mensajes").select();
  }
  deleteByIdMsj(id) {
    return this.knex.from("mensajes").where("id", id).del();
  }
  updateMsj(id, nuevoText) {
    return this.knex
      .from("mensajes")
      .where("id", id)
      .update({ text: nuevoText });
  }
}

module.exports = Chat;
