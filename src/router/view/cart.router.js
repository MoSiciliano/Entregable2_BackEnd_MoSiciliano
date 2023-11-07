import { Router } from "express";
import CartManager from "../../dao/CartManager.js";

const router = Router();

router.get("/carts", async (req, res) => {
  const carts = await CartManager.get();
  res.render("home", { carts: carts.map((p) => p.toJSON()) });
});

export default router;
