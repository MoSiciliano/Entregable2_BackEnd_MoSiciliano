import ProductsModels from "../models/products.models.js";

import { Exception } from "../utils.js";
export default class ProductManager {
  static get(query = {}) {
    const criteria = {};
    return ProductsModels.find(criteria);
  }
  static async getById(pid) {
    const product = await ProductsModels.getById(pid);
    if (!product) {
      throw new Exception(`Product with id:${pid} doesn't exist  yet 😣`);
    }
    return product;
  }
  static async create(data) {
    const product = await ProductsModels.create(data);
    console.log("Product created successfully 🎊");
    return product;
  }
  static async putById(pid, data) {
    const product = await ProductsModels.getById(pid);
    if (!product) {
      throw new Exception(`Product with id:${pid} doesn't exist  yet 😣`);
    }
    const criteria = { _id: pid };
    const operation = { $set: data };
    const result = ProductsModels.updateOne(criteria, operation);
    console.log(`Product  with id:${pid} updated successfully😁`);
  }
  static async deleteById(pid) {
    const product = await ProductsModels.getById(pid);
    if (!product) {
      throw new Exception(`Product with id:${pid} doesn't exist  yet 😣`);
    }
    const criteria = { _id: pid };
    await ProductsModels.deleteOne(criteria);
    console.log(`Product with id:${pid} deleted successfully`);
  }
}
