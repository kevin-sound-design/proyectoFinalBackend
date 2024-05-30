import { Router } from "express";
import { orderController } from "../controllers/order.controller.js";

const router = Router();

router.get("/user/:id", orderController.getOrdersByUserId);
router.get("/:id", orderController.getOrderById);

export default router;
