class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }
  getFullName() {
    console.log("Nombre Completo: " + this.nombre + " " + this.apellido);
  }

  countMascota() {
    console.log("Tiene " + this.mascotas.length + " mascota/s");
  }
  getBookNames() {
    let titles = this.libros.map(function (libro) {
      return libro["titulo"];
    });

    console.log(titles);
  }

  addMascota() {
    let newMascota = prompt("Ingrese nombre de mascota");
    let newMascota2 = prompt("Ingrese tipo de mascota");
    let newPet = { nombre: `${newMascota}`, tipo: `${newMascota2}` };
    this.mascotas.nombre = newMascota;
    this.mascotas.tipo = newMascota2;
    this.mascotas.push(newPet);
  }
  addBook() {
    let newLibro = prompt("Ingrese titulo del libro");
    let newLibro2 = prompt("Ingrese autor del libro");
    let newBook = { titulo: `${newLibro}`, autor: `${newLibro2}` };
    this.libros.titulo = newLibro;
    this.libros.autor = newLibro2;
    this.libros.push(newBook);
  }
}

const user1 = new Usuario(
  "Juan",
  "Perez",
  [{ titulo: "Ficciones", autor: "Jorge Luis Borges" }],
  [{ nombre: "Roma", tipo: "gato" }]
);
const user2 = new Usuario(
  "Ana",
  "Marquez",
  [{ titulo: "Moby Dick", autor: "Herman Melville" }],
  [
    { nombre: "Luna", tipo: "perro" },
    { nombre: "Gerard", tipo: "gato" },
  ]
);
const user3 = new Usuario(
  "Patricia",
  "Alvarez",
  [
    { titulo: "Hamlet", autor: "William Shakespeare" },
    { titulo: "Casa de Muñecas", autor: "Henrik Ibsen" },
  ],
  [
    { nombre: "Eevee", tipo: "perro" },
    { nombre: "Nala", tipo: "gato" },
  ]
);

//console.log(user1.getFullName());
//console.log(user2.countMascota());
//console.log(user3.getBookNames());
//console.log(user1.addBook());
//console.log(user1.getBookNames());
//console.log(user2.addMascota());
//console.log(user2.countMascota());
