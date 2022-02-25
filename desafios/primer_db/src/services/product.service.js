const db = require("../database/db");

class Product {
  async newProd(title, price, thumbnail) {
    //
    try {
      const [id] = await db("product")
        .insert({
          title,
          price,
          thumbnail,
        })
        .returning("id");
      return { msg: `producto ${id} creado` };
    } catch (err) {
      console.log("[falla al guardar]", err);
    }
  }

  async getById(id) {
    try {
      const data = await db("product")
        .select("id", "title", "price", "thumbnail")
        .where({ id: id });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const result = await db("product").select(
        "id",
        "title",
        "price",
        "thumbnail"
      );

      return result;
    } catch (error) {
      console.log(error);
      return "[]";
    }
  }

  async updateProd(cambios, id) {
    try {
      const { title, thumbnail, price } = cambios;
      const timestamp = db.fn.now();
      await db("product").where("id", id).update({
        title: title,
        thumbnail: thumbnail,
        price: price,
        updated_at_utc: timestamp,
      });

      return { msg: `producto ${id} actualizado` };
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProd(id) {
    try {
      await db("product").where({ id: id }).del();
      return { msg: `producto ${id} eliminado` };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new Product();
