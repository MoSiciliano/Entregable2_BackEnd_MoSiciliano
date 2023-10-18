import { Server } from "socket.io";
import ProductManager from "../src/clases/ProductManager.js";
const productManager = new ProductManager();
let io;
export const init = (serverHttp) => {
  io = new Server(serverHttp);
  io.on("connection", async (socketClient) => {
    console.log(`Se ha conectado un nuevo cliente  (${socketClient.id}) 🎊`);
    const products = await productManager.getProducts();
    socketClient.emit("listProducts", products);
    socketClient.on("disconnect", () => {
      console.log(`Se ha desconectado el cliente : ${socketClient.id} 😔`);
    });
  });
  console.log(`Server socket running ✔️`);
};
