const db = require("../database/db");

module.exports = class MessageService {
  async create(user, text) {
    const [id] = await db("message").insert({
      user,
      text,
    });
    return id;
  }

  async read() {
    try {
      const msgs = await db("message").select("user", "text", "created_at_utc");
      return console.log(msgs);
    } catch (error) {
      console.log(error);
    }
  }

  async update(data) {
    try {
      const { id, text } = data;
      const timestamp = db.fn.now();
      const [msgs] = await db("message").where("id", id).update({
        text: text,
        updated_at_utc: timestamp,
      });
      return msgs;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const [msgs] = await db("message").whereIn("id", id).del();
      return msgs;
    } catch (error) {
      console.log(error);
    }
  }
};
