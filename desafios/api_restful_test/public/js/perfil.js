fetch("templates/navbar.handlebars")
  .then((response) => {
    return response.text();
  })
  .then((template) => {
    const navbar = Handlebars.compile(template);
    const profilePicSrc = document.querySelector(".img-thumbnail").src;
    const html = navbar({ profilePicSrc });
    document.body.innerHTML += html;
  });
