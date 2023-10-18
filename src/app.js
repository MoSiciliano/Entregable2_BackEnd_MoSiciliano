import express from "express";
import handlebars from "express-handlebars";
import path from "path";
import routerProducts from "./router/products.router.js";
import routerCarts from "./router/cart.router.js";

import indexRouter from "./router/index.router.js";
import { __dirname } from "./utils.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.get("/", indexRouter);
// // app.get("/", (req, res) => {
// //   const welcome = `<body style="background-color: aqua; display:flex; justify-content: center;align-items: center;">
// //     <h1 style='color:rgb(155, 85, 185);text-align: center;'>Welcome to my ecommerce</h1>
// //     </body>`;
// //   res.send(welcome);
// // });
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);
app.use((error, req, res, next) => {
  const message = `Ah ocurrido un error desconocido 😨: ${error.message}`;
  console.log(message);
  res.status(500).json({ status: "error", message });
});

export default app;
