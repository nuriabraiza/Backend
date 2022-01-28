class Producto {
  productos = [];
  id = 0;

  //POST
  newProd(producto) {
    this.productos.push({
      id: ++this.id,
      title: producto.title,
      price: producto.price,
      url: producto.url,
    });

    return this.productos[this.id - 1];
  }

  //GET
  getById(id) {
    let prod = this.productos.find((producto) => {
      return producto.id == id;
    });
    if (prod == undefined) {
      return '{error: "Producto no encontrado."}';
    }

    return prod;
  }

  get prodList() {
    if (this.productos.length == 0) {
      return '{error: "No hay productos cargados."}';
    }

    return this.productos;
  }

  //PUT
  updateProd(cambios, id) {
    let indiceProd = this.productos.findIndex((prod) => {
      return prod.id == id;
    });
    let prodActualizado = { id: id, ...cambios };
    return (this.productos[indiceProd] = prodActualizado);
  }

  //DELETE
  deleteProd(id) {
    let indiceProd = this.productos.findIndex((prod) => {
      if (prod.id == id) {
        return prod;
      }
    });
    if (indiceProd == -1) {
      return '{error: "Producto no encontrado."}';
    }
    return this.productos.splice(indiceProd, 1)[0];
  }
}

module.exports = new Producto();
