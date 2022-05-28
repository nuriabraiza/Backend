fetch("/api/usuarios/current")
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    const user = json.user;
    const userId = user.id;

    if (window.localStorage.getItem("cart") != null) {
      const cart = JSON.parse(window.localStorage.getItem("cart"));
      const cartUserId = cart.userId.trim();
      if (cartUserId !== userId) {
        window.localStorage.removeItem("cart");
      }
    }

    if (window.localStorage.getItem("cart") == null) {
      fetch("/api/carrito", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          if (json.status === "success") {
            window.localStorage.setItem(
              "cart",
              JSON.stringify({ ...json.payload, userId })
            );
          } else {
            Swal.fire({
              title: "Error",
              text: json.message,
              icon: "error",
              timer: 2000,
            });
          }
        });
    }

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

    fetch("/api/productos").then((response) => {
      response.json().then((data) => {
        fetch("templates/productsTable.handlebars")
          .then((response) => response.text())
          .then((template) => {
            const templateFn = Handlebars.compile(template);
            const html = templateFn({ products: data });
            const productsDiv = document.getElementById("productos");
            productsDiv.innerHTML = html;

            document.querySelectorAll(".add-button").forEach((item) => {
              item.addEventListener("click", (_) => {
                const cart = JSON.parse(window.localStorage.getItem("cart"));
                addProduct(item, cart);
              });
            });
          });
      });
    });

    function addProduct(item, cart) {
      fetch("/api/carrito/" + cart.id + "/productos", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productoId: item.dataset.id,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          if (json.status === "success") {
            window.localStorage.setItem(
              "cart",
              JSON.stringify({ ...json.payload, userId: userId.trim() })
            );
            Swal.fire({
              title: "Éxito",
              text: json.message,
              icon: "success",
              timer: 2000,
            });
          } else {
            Swal.fire({
              title: "Error",
              text: json.message,
              icon: "error",
              timer: 2000,
            });
          }
        });
    }
  })
  .catch((error) => {
    console.log(error);
  });
