import { Server } from "socket.io";
import ProductManager from "./clases/ProductManager.js";
import ChatManager from "./dao/ChatManager.js";

let io;
let messages = [];

export const init = (httpServer) => {
  io = new Server(httpServer);
  io.on("connection", async (socketClient) => {
    console.log("Cliente conectado 💪 ", socketClient.id);

    socketClient.emit("notification", { messages });
    socketClient.on("addProduct", async (newProduct) => {
      await ProductManager.create(newProduct);
      let products = await ProductManager.get();
      socketClient.emit("listProducts", products);
      io.emit("listProducts", products);
    });
    socketClient.broadcast.emit("new-client");
    // socketClient.on("deleteProductById", async (idToDelete) => {
    // await ProductManager.deleteOne(idToDelete);
    // io.emit("listProducts", products);
    // });
    socketClient.on("new-message", async (data) => {
      const { username, text } = data;
      messages.push({ username, text });
      await ChatManager.create(data);
      io.emit("notification", { messages });
    });
    socketClient.on("disconnect", () => {
      console.log(`Se ha desconectado el cliente : ${socketClient.id} 😔`);
    });
  });

  console.log("server socket running");
};

// export const emitData = (event, data) => io.emit(event, data);
