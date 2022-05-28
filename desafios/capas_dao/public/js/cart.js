fetch("/api/usuarios/current")
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    const user = json.user;
    fetch("templates/navbar.handlebars")
      .then((response) => {
        return response.text();
      })
      .then((template) => {
        const navbar = Handlebars.compile(template);
        const profilePicSrc = user.avatar;
        const html = navbar({ profilePicSrc });
        document.body.innerHTML += html;
      });

    let cart = window.localStorage.getItem("cart");
    let cartId = -1;
    if (cart !== undefined && cart !== null) {
      cartId = JSON.parse(cart).id;
      cart = JSON.parse(cart).products;
    }

    cartItems = [];

    fetch("/api/carrito/" + cartId + "/productos")
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          cartItems = res.payload;
          fetch("templates/carrito.handlebars")
            .then((response) => response.text())
            .then((template) => {
              const templateFn = Handlebars.compile(template);
              const html = templateFn({ cart: cartItems });
              const formDiv = document.getElementById("cart");
              formDiv.innerHTML = html;

              document.querySelectorAll(".delete-button").forEach((item) => {
                item.addEventListener("click", (event) => {
                  Swal.fire({
                    title: "¿Esta seguro?",
                    text: "¿Estás seguro de eliminar este producto del carrito?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Eliminar",
                    cancelButtonText: "Cancelar",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      fetch(
                        "/api/carrito/" +
                          cartId +
                          "/productos/" +
                          item.dataset.id,
                        {
                          method: "DELETE",
                        }
                      ).then((_) => {
                        Swal.fire(
                          "¡Eliminado!",
                          "El producto fue eliminado del carrito.",
                          "success"
                        ).then((_) => {
                          window.location.reload();
                        });
                      });
                    }
                  });
                });
              });

              const deleteCartBtn = document.querySelector(".delete-cart");
              const checkoutBtn = document.querySelector(".checkout");
              if (cartItems.length > 0) {
                deleteCartBtn.addEventListener("click", (event) => {
                  fetch("/api/carrito/" + cartId, {
                    method: "DELETE",
                  })
                    .then((res) => res.json())
                    .then((res) => {
                      if (res.status === "success") {
                        window.localStorage.removeItem("cart");
                        window.location.href = "/home";
                      } else {
                        Swal.fire({
                          title: "Error",
                          text: res.message,
                          icon: "error",
                          timer: 2000,
                        });
                      }
                    });
                });

                checkoutBtn.addEventListener("click", (event) => {
                  fetch("/api/carrito/" + cartId + "/checkout", {
                    method: "POST",
                  }).then((res) => {
                    res.json().then((res) => {
                      if (res.status === "success") {
                        Swal.fire({
                          title: "¡Compra realizada!",
                          text: res.message,
                          icon: "success",
                          timer: 2000,
                        }).then((_) => {
                          window.localStorage.removeItem("cart");
                          window.location.href = "/home";
                        });
                      } else {
                        Swal.fire({
                          title: "Error",
                          text: res.message,
                          icon: "error",
                          timer: 2000,
                        });
                      }
                    });
                  });
                });
              } else {
                deleteCartBtn.style.display = "none";
                checkoutBtn.style.display = "none";
              }
            });
        } else if (res.status === "error" && cartId !== -1) {
          Swal.fire({
            title: "Error",
            text: res.message,
            icon: "error",
            timer: 2000,
          });
        }
      });
  });
