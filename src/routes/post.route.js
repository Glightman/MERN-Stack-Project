import { Router } from "express"
import { create, findAll, topPost, findById } from "../controllers/post.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router()

/* 
import postController from "../controllers/post.controller.js";*/

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topPost)
router.get("/:id", findById)

export default router