import { Router } from "express";
import ProductManager from "../../dao/ProductManager.js";
const router = Router();

router.get("/products", async (req, res) => {
  const { query } = req;
  const products = await ProductManager.get(query);
  if (!products) {
    res.status(404).send(`We don't have any products already`);
  }
  res.status(200).json(products);
});
//getById
router.get("/products/:pid", async (req, res) => {
  try {
    const {
      params: { pid },
    } = req;
    const product = await ProductManager.getById(pid);
    if (!product) {
      res.status(404).send(`Product with id:${pid}, does't exist yet `);
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});
router.post("/products", async (req, res) => {
  const { body } = req;
  const product = await ProductManager.create(body);
  res.status(201).json(product);
});
router.put("/products/:pid", async (req, res) => {
  try {
    const {
      params: { pid },
      body,
    } = req;
    await ProductManager.updateById(pid, body);
    res.status(204).end();
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});
router.delete("/products/:pid", async (req, res) => {
  try {
    const {
      params: { pid },
    } = req;
    await ProductManager.deleteById(pid);
    res.status(204).end();
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

export default router;
