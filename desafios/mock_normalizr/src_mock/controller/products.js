const Producto = require("../model/producto");

class ProductController {
  constructor() {
    this.productos = [];
  }

  generar(cant = 50) {
    for (let i = 0; i < cant; i++) {
      this.productos.push(Producto.generarProducto());
    }

    return this.productos;
  }

  buscarPorId(id) {
    const producto = this.productos.find((producto) => producto.id === id);
    return producto || { error: `producto con id ${id} no encontrado` };
  }

  listar() {
    return this.productos;
  }

  agregar(producto) {
    let id = producto.generarId();
    producto.id = id;
    this.productos.push(producto);

    return this.productos;
  }

  actualizar(id, datos) {
    this.productos = this.productos.map((producto) => {
      if (producto.id === id) {
        let actualizado = Object.assign(producto, datos);
        console.log(actualizado);
        return actualizado;
      }

      return producto;
    });

    return this.productos;
  }

  eliminar(id) {
    this.productos = this.productos.filter((producto) => {
      return producto.id !== id;
    });

    return this.productos;
  }
}

module.exports = new ProductController();
