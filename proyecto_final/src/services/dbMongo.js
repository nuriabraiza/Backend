import mongoose from "mongoose";
import config from "../config.js";
import { statusMessages } from "../utils/status.js";

mongoose.connect(config.mongo.baseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default class Contenedor {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
    this.status = statusMessages;
  }

  async save(object) {
    try {
      let newElement = await this.collection.create(object);
      return {
        status: "Success",
        message: this.status.save.success.message,
        id: newElement._id,
      };
    } catch (err) {
      return {
        status: "Error",
        message: this.status.save.error.message,
        error: err,
      };
    }
  }

  async getAll() {
    try {
      let res = await this.collection.find();
      return {
        status: "Success",
        message: this.status.getAll.success.message,
        payload: res,
      };
    } catch (err) {
      return {
        status: "Error",
        message: this.status.getAll.error.message,
      };
    }
  }

  async getById(id) {
    try {
      let res = await this.collection.findById(id);
      return {
        status: "Success",
        message: this.status.getById.success.message,
        payload: res,
      };
    } catch (err) {
      return {
        status: "Error",
        message: this.status.getById.error.message,
        error: err,
      };
    }
  }

  async update(id, object) {
    try {
      await this.collection.updateOne({ _id: id }, object);
      return {
        status: "Success",
        message: this.status.update.success.message,
      };
    } catch (err) {
      return {
        status: "Error",
        message: this.status.update.error.message,
        error: err,
      };
    }
  }

  async deleteById(id) {
    try {
      await this.collection.deleteOne({ _id: id });
      return {
        status: "Success",
        message: this.status.deleteById.success.message,
      };
    } catch (err) {
      return {
        status: "Error",
        message: this.status.deleteById.error.message,
      };
    }
  }
}
