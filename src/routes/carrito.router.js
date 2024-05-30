import { Router } from "express";
import { carritoController } from "../controllers/carrito.controller.js";

const router = Router();

router.post('/', carritoController.guardarPedidos)



export default router;