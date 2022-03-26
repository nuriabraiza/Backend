export const statusMessages = {
  save: {
    success: {
      status: "Success",
      message: "Se ha creado un elemento con éxito.",
    },
    error: {
      status: "Error",
      message: "Error al cargar la lista de elementos.",
    },
  },
  getById: {
    success: {
      status: "Success",
      message: "El elemento existe en la base de datos.",
    },
    error: {
      status: "Error",
      message: "No se encontro el elemento solicitado en la lista.",
    },
  },
  update: {
    success: {
      status: "Success",
      message: "Se ha actualizado un elemento con éxito.",
    },
    error: {
      status: "Error",
      message: "Error al actualizar un elemento de la lista.",
    },
  },
  getAll: {
    success: {
      status: "Success",
      message: "Se devolvío con éxito los elementos guardados en la lista.",
    },
    error: {
      status: "Error",
      message: "No se encontraron los elementos solicitados.",
    },
  },
  deleteById: {
    success: {
      status: "Success",
      message: "Elemento eliminado con éxito de la lista.",
    },
    error: {
      status: "Error",
      message: "Hubo un problema al borrar el elemento de la lista.",
    },
  },
  deleteAll: {
    success: {
      status: "Success",
      message: "Se elimino la lista de elementos.",
    },
    error: {
      status: "Error",
      message: "Hubo un error al intentar borrar la lista.",
    },
  },
};
