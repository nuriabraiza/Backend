const fs = require("fs");
class Contenedor {
  constructor(file) {
    this.path = "./";
    this.file = `${file}.txt`;
  }

  async save(object) {
    try {
      let res = await fs.promises.readFile(`${this.path}${this.file}`, "utf-8");
      let productos = JSON.parse(res);
      const producto = {
        id: productos[productos.length - 1].id + 1,
        title: object.title,
        price: object.price,
        thumbnail: object.thumbnail,
      };
      productos.push(producto);
      try {
        await fs.promises.writeFile(
          `${this.path}${this.file}`,
          JSON.stringify(productos, null, 2)
        );
        return {
          status: "Success",
          message: "Producto creado con éxito.",
          id: producto.id,
        };
      } catch (err) {
        return {
          status: "Error",
          message: "Error al cargar el producto.",
          error: err,
        };
      }
    } catch (err) {
      const producto = {
        id: 1,
        title: object.title,
        price: object.price,
        thumbnail: object.thumbnail,
      };
      try {
        await fs.promises.writeFile(
          `${this.path}${this.file}`,
          JSON.stringify([producto], null, 2)
        );
        return {
          status: "Success",
          message: "Archivo y producto creado con éxito.",
          id: producto.id,
        };
      } catch (err) {
        return {
          status: "Error",
          message: "Error al crear el archivo y producto.",
          error: err,
        };
      }
    }
  }

  async getById(id) {
    try {
      let res = await fs.promises.readFile(`${this.path}${this.file}`, "utf-8");
      let productos = JSON.parse(res);
      let producto = productos.find((el) => el.id === id);
      if (!producto) {
        throw new Error();
      }
      return { status: "Success", data: producto };
    } catch (err) {
      return {
        status: "Error",
        message: "No se encontro el producto solicitado.",
        error: err,
        data: null,
      };
    }
  }

  async getAll() {
    try {
      let res = await fs.promises.readFile(`${this.path}${this.file}`, "utf-8");
      let productos = JSON.parse(res);
      return { status: "Success", data: productos };
    } catch (err) {
      return {
        status: "Error",
        message: "No se encontro el producto solicitado.",
      };
    }
  }

  async deleteById(id) {
    try {
      let res = await fs.promises.readFile(`${this.path}${this.file}`, "utf-8");
      let productos = JSON.parse(res);
      let siExiste = productos.find((el) => el.id === id);
      if (!siExiste) {
        throw new Error();
      }
      let productosActualizados = productos.filter((el) => el.id !== id);
      try {
        await fs.promises.writeFile(
          `${this.path}${this.file}`,
          JSON.stringify(productosActualizados, null, 2)
        );
        return { status: "Success", message: "Producto eliminado con éxito." };
      } catch (err) {
        return {
          status: "Error",
          message: "Hubo un problema al borrar el producto.",
        };
      }
    } catch (err) {
      return {
        status: "Error",
        message: "No se encontro el producto solicitado.",
      };
    }
  }

  async deleteAll() {
    try {
      await fs.promises.unlink(`${this.path}${this.file}`);
      return {
        status: "Success",
        message: "Se eliminaron todos los objetos del archivo.",
      };
    } catch (err) {
      return {
        status: "Error",
        message: "Hubo un error al intentar borrar los archivos.",
        error: err,
      };
    }
  }
  async getRandomProduct() {
    let randomList = await productos.getAll();
    const maxId = randomList.length;

    if (maxId) {
      const randomId = parseInt(Math.random() * maxId + 1);
      const randomProduct = await productos.getById(randomId);

      return randomProduct;
    } else {
      return "Producto no encontrado";
    }
  }
}

module.exports = Contenedor;

/* ------ PRUEBA ------ */

const carrito = new Contenedor("productos");

// SAVE()
carrito
  .save({
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
  })
  .then(() =>
    carrito
      .save({
        title: "Calculadora",
        price: 234.56,
        thumbnail:
          "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
      })
      .then(() =>
        carrito.save({
          title: "Globo Terráqueo",
          price: 345.67,
          thumbnail:
            "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        })
      )
  );

//GET BY ID
//carrito.getById(2).then((data) => console.log(data));
//carrito.getById(152).then(data=>console.log(data))

//DELETE BY ID
//carrito.deleteById(1).then((data) => console.log(data));
//carrito.deleteById(152).then(data => console.log(data))

//GET ALL
//carrito.getAll().then((data) => console.log(data));

//DELETE ALL
//carrito.deleteAll().then((data) => console.log(data));
