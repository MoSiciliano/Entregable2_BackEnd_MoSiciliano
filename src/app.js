import express from "express";
import handlebars from "express-handlebars";
import path from "path";
import { __dirname } from "./utils.js";
// import routerProducts from "./router/products.router.js";
// import routerCarts from "./router/cart.router.js";
import homeRouter from "./router/index.router.js";
import productsApiRouter from "./router/api/products.router.js";
import productsViewRouter from "./router/view/products.router.js";
import cartsApiRouter from "./router/api/cart.router.js";
import cartViewRouter from "./router/view/cart.router.js";
import chatViewRouter from "./router/view/chat.router.js";
import chatApiRouter from "./router/api/chat.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use("/", chatApiRouter);
app.use("/", productsViewRouter, cartViewRouter, chatViewRouter);
app.use("/api", productsApiRouter, cartsApiRouter);
app.get("/realTimeProducts", homeRouter);

app.use((error, req, res, next) => {
  const message = `Ah ocurrido un error desconocido 😨: ${error.message}`;
  console.log(message);
  res.status(500).json({ status: "error", message });
});

export default app;
