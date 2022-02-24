const knex = require("knex");

class ProductDB {
  constructor(config) {
    this.knex = knex(config);
  }

  table() {
    return this.knex.schema.dropTableIfExists("productos").then(() => {
      return this.knex.schema.createTable("productos", (table) => {
        table.increments("id").primary();
        table.string("nombre").notNullable();
        table.float("precio");
        table.integer("thumbnail");
      });
    });
  }

  addProd(productos) {
    return this.knex("productos").insert(productos);
  }

  getAll() {
    return this.knex("productos").select();
  }

  getById(id) {
    return this.knex.from("productos").where("id", id).select();
  }

  deleteById(id) {
    return this.knex.from("productos").where("id", id).del();
  }
  updateById(id, data) {
    const nuevoTitle = data.title;
    const nuevoPrice = data.price;
    const nuevothumbnail = data.thumbnail;

    return this.knex.from("productos").where("id", id).update({
      title: nuevoTitle,
      price: nuevoPrice,
      thumbnail: nuevothumbnail,
    });
  }
}

module.export = ProductDB;
