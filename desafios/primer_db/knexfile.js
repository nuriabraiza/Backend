require("dotenv").config();

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./database/mensajes.sqlite3",
    },
    useNullAsDefault: false,
  },

  production: {
    client: "mysql",
    connection: {
      database: process.env.DB,
      user: process.env.USER,
      host: "127.0.0.1",
      port: process.env.PORT || "3306",
    },
    pool: {
      min: 0,
      max: 7,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
