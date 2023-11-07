import { Router } from "express";
import ChatManager from "../../dao/ChatManager.js";

const router = Router();
router.get("/chat", async (req, res) => {
  const message = await ChatManager.get();
  res.render("chat", { message: message.map((m) => m.toJSON()) });
});

export default router;
