import { Router } from "express"
import { create, 
    findAll, 
    topPost, 
    findById, 
    searchByTitle, 
    byUser,
    update,
    erase } from "../controllers/post.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topPost)
router.get("/search", searchByTitle);
router.get("/byUser", authMiddleware, byUser )
router.get("/:id", authMiddleware, findById)
router.patch("/:id", authMiddleware, update)
router.delete("/:id", authMiddleware, erase);

export default router