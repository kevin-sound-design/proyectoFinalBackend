import { Router } from "express";
import { orderController } from "../controllers/order.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/user/:id", authMiddleware, orderController.getOrdersByUserId);
router.get("/:id", authMiddleware, orderController.getOrderById);

export default router;
