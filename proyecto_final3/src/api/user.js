import mongoose from "mongoose";
import Container from "../containers/Container.js";
import { deleteImage, returnMessage } from "../utils/functions.js";

class UsersApi extends Container {
  constructor() {
    super(
      "users",
      new mongoose.Schema(
        {
          name: { type: String, required: true },
          surname: { type: String, required: true },
          email: { type: String, required: true, unique: true },
          password: { type: String },
          username: { type: String, required: true, unique: true },
          phoneNumber: { type: String, required: true },
          role: { type: String, required: true, default: "user" },
          avatar: {
            type: String,
            required: true,
            default: "https://avatars.dicebear.com/api/identicon/default.png",
          },
          age: { type: Number, required: true, default: 0 },
          address: { type: String, required: true },
        },
        { timestamps: true }
      ),
      "Usuario"
    );
  }

  async createOne(user) {
    if (!user.avatar) {
      return returnMessage(true, 500, "Error al subir la imagen", null);
    }

    if (!user.name) {
      await deleteImage(user.avatar);
      return returnMessage(true, 400, "El nombre es obligatorio", null);
    }

    if (!user.surname) {
      await deleteImage(user.avatar);
      return returnMessage(true, 400, "El apellido es obligatorio", null);
    }

    if (!user.email) {
      await deleteImage(user.avatar);
      return returnMessage(true, 400, "El email es obligatorio", null);
    }

    if (!user.password) {
      await deleteImage(user.avatar);
      return returnMessage(true, 400, "La contraseña es obligatoria", null);
    }

    if (!user.username) {
      await deleteImage(user.avatar);
      return returnMessage(true, 400, "El username es obligatorio", null);
    }

    if (!user.phoneNumber) {
      await deleteImage(user.avatar);
      return returnMessage(true, 400, "El telefono es obligatorio", null);
    }

    if (!user.avatar) {
      await deleteImage(user.avatar);
      return returnMessage(true, 400, "La imagen es obligatoria", null);
    }

    if (!user.age) {
      await deleteImage(user.avatar);
      return returnMessage(true, 400, "La edad es obligatoria", null);
    }

    if (!user.address) {
      await deleteImage(user.avatar);
      return returnMessage(true, 400, "La direccion es obligatoria", null);
    }

    const result = await super.createOne(user);
    if (result.code !== 200) {
      await deleteImage(user.avatar);
    }
    return result;
  }
}

export default new UsersApi();
