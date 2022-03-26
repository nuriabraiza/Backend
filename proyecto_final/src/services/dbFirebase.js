import admin from "firebase-admin";
import config from "../config";

admin.initializeApp({
  credential: admin.credential.cert(config.firebase.serviceAccount),
  databaseURL: `https://${config.firebase.baseUrl}.firebaseio.com`,
});

export default class Contenedor {
  constructor(collection) {
    this.FieldValue = admin.firestore.FieldValue;
    this.firebase = admin.firestore();
    this.collection = this.firebase.collection(collection);
  }

  async save(object) {
    try {
      const newElement = await this.collection
        .add(object)
        .then((doc) => doc.id);
      return {
        status: "Success",
        message: "Un nuevo elemento fue agregado a la base de datos.",
        id: newElement,
      };
    } catch (err) {
      return {
        status: "Error",
        message: `No se pudo guardar el documento: ${err}`,
      };
    }
  }

  async getAll() {
    try {
      const search = await this.collection.get();
      const data = search.docs;
      const res = data.map((doc) => doc.data());
      return {
        status: "Success",
        message: "Se obtuvieron de manera exitosa los datos.",
        payload: res,
      };
    } catch (err) {
      return {
        status: "Error",
        message: `No se pudo encontrar los documentos: ${err}`,
      };
    }
  }

  async getById(id) {
    try {
      const doc = this.collection.doc(id);
      let data = await doc.get();
      let res = data.data();
      if (!res) {
        return {
          status: "Error",
          message: `No se encontro un elemento con ese ID en la base de datos.`,
        };
      } else {
        return {
          status: "Success",
          message: "Se obtuvo el elemento buscado.",
          payload: res,
        };
      }
    } catch (err) {
      return {
        status: "Error",
        message: `No se pudo obtener el documento solicitado: ${err}`,
      };
    }
  }

  async update(id, object) {
    try {
      const doc = this.collection.doc(id);
      await doc.update(object);
      return {
        status: "Success",
        message: "Se actualizo con éxito el elemento.",
      };
    } catch (err) {
      return {
        status: "Error",
        message: `No se pudo actualizar el documento: ${err}`,
      };
    }
  }

  async deleteById(id) {
    try {
      const exist = await this.getById(id);
      if (exist.status === "Error") {
        return {
          status: "Error",
          message: "No existe el documento que quiere borrar.",
        };
      } else {
        const doc = this.collection.doc(id);
        await doc.delete();
        return {
          status: "Success",
          message: "Se elimino con éxito el elemento.",
        };
      }
    } catch (err) {
      return {
        status: "Error",
        message: `No se pudo eliminar el documento: ${err}`,
      };
    }
  }
}
