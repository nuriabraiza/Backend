import mongoose from "mongoose";
import config from "../config.js";
import {
  removeField,
  renameField,
  returnMessage,
  toObj
} from "../utils/functions.js";

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

class Container {
  constructor(collectionName, schema, objName) {
    this.collectionName = collectionName;
    this.collection = mongoose.model(collectionName, schema);
    this.objName = objName;
  }

  async getAll() {
    try {
      let objs;
      if (this.collectionName === "messages") {
        objs = await this.collection.find({ __v: 0 }).populate("user");
      } else {
        objs = await this.collection.find({ __v: 0 }).lean();
      }
      if (objs.length !== 0) {
        objs = objs.map(toObj);
        objs.map((obj) => renameField(obj, "_id", "id"));
        objs.map((obj) => removeField(obj, "__v"));
      }
      return returnMessage(false, 200, `${this.objName}s encontrados`, objs);
    } catch (error) {
      return returnMessage(
        true,
        500,
        `Error al obtener los ${this.objName}s - ${error}`,
        null
      );
    }
  }

  async getOneById(id) {
    try {
      let obj = await this.collection.findOne({ _id: id });
      if (obj === null) {
        return returnMessage(true, 404, `${this.objName} no encontrado`, null);
      }
      obj = toObj(obj);
      renameField(obj, "_id", "id");
      removeField(obj, "__v");
      return returnMessage(false, 200, `${this.objName} encontrado`, obj);
    } catch (error) {
      if (error.name === "CastError") {
        return returnMessage(true, 400, `${this.objName} no encontrado`, null);
      }
      return returnMessage(
        true,
        500,
        `Error al obtener el ${this.objName}`,
        null
      );
    }
  }

  async getOneByProperty(property, value) {
    try {
      let obj = await this.collection.findOne({ [property]: value });
      if (obj === null) {
        return returnMessage(true, 404, `${this.objName} no encontrado`, null);
      }
      obj = toObj(obj);
      renameField(obj, "_id", "id");
      removeField(obj, "__v");
      return returnMessage(false, 200, `${this.objName} encontrado`, obj);
    } catch (error) {
      if (error.name === "CastError") {
        return returnMessage(true, 400, `${this.objName} no encontrado`, null);
      }
      return returnMessage(
        true,
        500,
        `Error al obtener el ${this.objName}`,
        null
      );
    }
  }

  async getListByIds(ids) {
    try {
      const objs = await this.getAll();
      if (objs.code !== 200) {
        return objs;
      }

      const objsPayload = objs.payload;
      const objsFiltered = objsPayload.filter((obj) => ids.includes(obj.id));
      return returnMessage(
        false,
        200,
        `${this.objName}s encontrados`,
        objsFiltered
      );
    } catch (error) {
      return returnMessage(
        true,
        500,
        `Error al obtener los ${this.objName}s`,
        null
      );
    }
  }

  async createOne(obj) {
    try {
      let createdObj = await this.collection.create(obj);
      createdObj = toObj(createdObj);
      renameField(createdObj, "_id", "id");
      removeField(createdObj, "__v");
      return returnMessage(false, 200, `${this.objName} creado`, createdObj);
    } catch (error) {
      return returnMessage(
        true,
        500,
        `Error al crear el ${this.objName} - ${error}`,
        null
      );
    }
  }

  async updateOneById(id, obj) {
    try {
      obj = renameField(obj, "id", "_id");
      let updatedObj = await this.collection.findOneAndUpdate(
        { _id: id },
        obj,
        { new: true }
      );
      if (!updatedObj) {
        return returnMessage(true, 404, `${this.objName} no encontrado`, null);
      }
      updatedObj = toObj(updatedObj);
      renameField(updatedObj, "_id", "id");
      removeField(updatedObj, "__v");
      return returnMessage(
        false,
        200,
        `${this.objName} actualizado`,
        updatedObj
      );
    } catch (error) {
      //check for cast error
      if (error.name === "CastError") {
        return returnMessage(true, 400, `ID de ${this.objName} inválido`, null);
      }
      return returnMessage(
        true,
        500,
        `Error al actualizar el ${this.objName}`,
        null
      );
    }
  }

  async deleteOneById(id) {
    try {
      const objToDelete = (await this.getOneById(id)).payload;
      if (!objToDelete) {
        return returnMessage(true, 404, `${this.objName} no encontrado`, null);
      }
      await this.collection.deleteOne({ _id: id });
      return returnMessage(
        false,
        200,
        `${this.objName} eliminado`,
        objToDelete
      );
    } catch (error) {
      return returnMessage(
        true,
        500,
        `Error al eliminar el ${this.objName}`,
        null
      );
    }
  }

  async deleteAll() {
    try {
      const { n, nDeleted } = await this.collection.deleteMany({});
      if (n === 0 || nDeleted === 0) {
        return returnMessage(true, 404, `No hay ${this.objName}s`, null);
      }
      return returnMessage(false, 200, `${this.objName}s eliminados`, null);
    } catch (error) {
      return returnMessage(
        true,
        500,
        `Error al eliminar los ${this.objName}s`,
        null
      );
    }
  }
}

export default Container;
