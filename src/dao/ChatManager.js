import chatModel from "../models/chat.model.js";

export default class ChatManager {
  static get(query) {
    return chatModel.find(query);
  }
  static async create(data) {
    const message = await chatModel.create(data);
    console.log("Mensaje creado con exito");
    return message;
  }
}
