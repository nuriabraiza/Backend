import GenericQueries from "./GenericQueries.js";
import { deleteImage, returnMessage } from "../utils/functions.js";

export default class UserService extends GenericQueries {
  constructor(dao) {
    super(dao, "Users");
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
