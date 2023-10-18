import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("index", { title: "socket.io demo" });
});

export default router;
