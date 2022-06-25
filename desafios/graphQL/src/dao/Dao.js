import mongoose from "mongoose";
import config from "../config.js";
import { Cart, Product, User } from "./models/index.js";
import { returnMessage } from "../utils/functions.js";
import { toObj, removeField, renameField } from "../utils/functions.js";

export default class Dao {
  constructor() {
    this.mongoose = mongoose
      .connect(config.mongodb.cnxStr, config.mongodb.options)
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });
    const timestamp = {
      timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    };
    const cartSchema = mongoose.Schema(Cart.schema, timestamp);
    const productSchema = mongoose.Schema(Product.schema, timestamp);
    const userSchema = mongoose.Schema(User.schema, timestamp);

    this.models = {
      [Cart.model]: mongoose.model(Cart.model, cartSchema),
      [Product.model]: mongoose.model(Product.model, productSchema),
      [User.model]: mongoose.model(User.model, userSchema),
    };
  }

  getAll = async (options, entity) => {
    if (!this.models[entity]) {
      return returnMessage(
        true,
        400,
        `No se encontró la entidad ${entity}`,
        null
      );
    }
    try {
      let objs;
      objs = await this.models[entity].find(options).lean();
      if (objs.length !== 0) {
        objs = objs.map(toObj);
        objs.map((obj) => renameField(obj, "_id", "id"));
        objs.map((obj) => removeField(obj, "__v"));
      }
      return returnMessage(false, 200, `${entity}s encontrados`, objs);
    } catch (error) {
      return returnMessage(
        true,
        500,
        `Error al obtener los ${entity}s`,
        null,
        error
      );
    }
  };

  getOne = async (options, entity) => {
    if (!this.models[entity]) {
      return returnMessage(
        true,
        400,
        `No se encontró la entidad ${entity}`,
        null
      );
    }
    try {
      let obj = await this.models[entity].findOne(options).limit(1);
      if (obj === null) {
        return returnMessage(true, 404, `${entity} no encontrado`, null);
      }
      obj = toObj(obj);
      renameField(obj, "_id", "id");
      removeField(obj, "__v");
      return returnMessage(false, 200, `${entity} encontrado`, obj);
    } catch (error) {
      if (error.name === "CastError") {
        return returnMessage(true, 400, `${entity} no encontrado`, null);
      }
      return returnMessage(
        true,
        500,
        `Error al obtener el ${entity}`,
        null,
        error
      );
    }
  };

  createOne = async (document, entity) => {
    if (!this.models[entity]) {
      return returnMessage(
        true,
        400,
        `No se encontró la entidad ${entity}`,
        null
      );
    }
    try {
      let obj = await this.models[entity].create(document);
      obj = toObj(obj);
      renameField(obj, "_id", "id");
      removeField(obj, "__v");
      return returnMessage(false, 201, `${entity} creado`, obj);
    } catch (error) {
      return returnMessage(
        true,
        500,
        `Error al crear el ${entity}`,
        null,
        error
      );
    }
  };

  updateOneById = async (id, document, entity) => {
    if (!this.models[entity]) {
      return returnMessage(
        true,
        400,
        `No se encontró la entidad ${entity}`,
        null
      );
    }
    try {
      let obj = await this.models[entity].findOneAndUpdate(
        { _id: id },
        document,
        { new: true }
      );
      if (!obj) {
        return returnMessage(true, 404, `${entity} no encontrado`, null);
      }
      obj = toObj(obj);
      renameField(obj, "_id", "id");
      removeField(obj, "__v");
      return returnMessage(false, 200, `${entity} actualizado`, obj);
    } catch (error) {
      if (error.name === "CastError") {
        return returnMessage(true, 400, `ID de ${entity} inválido`, null);
      }
      return returnMessage(
        true,
        500,
        `Error al actualizar el ${entity}`,
        null,
        error
      );
    }
  };

  deleteOneById = async (id, entity) => {
    if (!this.models[entity]) {
      return returnMessage(
        true,
        400,
        `No se encontró la entidad ${entity}`,
        null
      );
    }
    try {
      let obj = await this.models[entity].findOneAndDelete({ _id: id });
      if (!obj) {
        return returnMessage(true, 404, `${entity} no encontrado`, null);
      }
      renameField(obj, "_id", "id");
      removeField(obj, "__v");
      return returnMessage(false, 200, `${entity} eliminado`, obj);
    } catch (error) {
      if (error.name === "CastError") {
        return returnMessage(true, 400, `ID de ${entity} inválido`, null);
      }
      return returnMessage(
        true,
        500,
        `Error al eliminar el ${entity}`,
        null,
        error
      );
    }
  };
}
