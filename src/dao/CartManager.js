import cartModel from "../models/cart.models.js";

import { Exception } from "../utils.js";

export default class CartManager {
  static get() {
    return cartModel.find();
  }
  static async getById(cid) {
    const cart = await cartModel.findById(cid);
    console.log("Cart", cart);
    if (!cart) {
      throw new Exception(`The cart with id: ${cid}, doesn't exist`, 404);
    }
    return cart;
  }
  static async deleteById(cid) {
    const cart = await cartModel.findById(cid);
    if (!cart) {
      throw new Exception(`The cart with id: ${cid}, doesn't exist`, 404);
    }
    const criteria = { _id: cid };
    await cartModel.deleteOne(criteria);
    console.log(`The cart with id:${cid} was deleted successfully`);
  }
  static async addToCart(cid, pid) {
    const cart = await cartModel.findById(cid);
    console.log("Cart", cart);
    if (!cart) {
      throw new Exception(`The cart with id: ${cid}, doesn't exist`, 404);
    }
    const index = cart.products.findIndex((p) => String(product._id) === pid);
    if (index === 1) {
      cart.products.push({ product: pid, quantity: 1 });
    } else {
      cart.products[index].quantity++;
    }
    await cartModel.updateOne({ _id: cid }, cart);
  }
}
