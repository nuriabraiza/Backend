// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://jspm.dev/react@17.0.2";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://jspm.dev/react-dom@17.0.2/server";
import {
  createApp,
  contentTypeFilter,
} from "https://deno.land/x/servest@v1.3.1/mod.ts";

const app = createApp();
let visitas: number = 0;
let colorsArray: any[] = [];
let formData = new FormData();

app.handle("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>servest</title>
        </head>
        <body style={{ backgroundColor: "black" }}>
          <h1 style={{ color: "greenyellow" }}>Hello Servest con React!!!!</h1>
          <h2 style={{ color: "mediumvioletred" }}>Visitas: {++visitas}</h2>
          <h3 style={{ color: "purple" }}>
            Fecha y hora: {new Date().toLocaleString()}
          </h3>
          <br />
          <form action="/color" method="POST">
            <input
              type="text"
              name="color"
              placeholder="Yellow, red, blue..."
            />
            <button type="submit">Send</button>
          </form>
          <h4 style={{ color: "paleturquoise" }}> ** Color list ** </h4>
          <ul>
            {colorsArray.map((color) => (
              <li key={color} style={{ color: color }}>
                {color}
              </li>
            ))}
          </ul>
        </body>
      </html>
    ),
  });
});

app.post(
  "/color",
  contentTypeFilter("application/x-www-form-urlencoded"),
  async (req) => {
    let data: any = await req.formData();
    data = data.value("color");
    //formData.append("cor", data);
    //console.log(formData);
    colorsArray.push(data);
    console.log(colorsArray);
    req.redirect("/");
  }
);

app.listen({ port: 8080 });
