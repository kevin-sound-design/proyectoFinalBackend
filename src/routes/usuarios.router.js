import { Router } from "express";
import { usuariosController } from "../controllers/usuarios.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, usuariosController.getAllUsers);
router.get("/:id", authMiddleware, usuariosController.getUserById);
router.put("/:id", authMiddleware, usuariosController.updateUserById);

export default router;
