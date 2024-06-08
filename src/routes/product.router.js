// routes/product.router.js
import { Router } from "express";
import { productController } from "../controllers/product.controller.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, isAdmin, productController.createProductController);
router.put("/:id", authMiddleware, isAdmin, productController.updateProduct);
router.delete("/:id", authMiddleware, isAdmin, productController.deleteProduct);

export default router;
