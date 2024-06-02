import { Router } from "express";
import { galeriaController } from "../controllers/galeria.controller.js";
import { datatypeMiddleware } from "../middlewares/datatype.middleware.js";

const router = Router();

router.get("/", galeriaController.getProducts);

router.get("/categorias", galeriaController.getCategories);

router.get(
  "/filtros",
  datatypeMiddleware,
  galeriaController.getProductsByFilters
);

router.get("/:id", galeriaController.getProductById);

export default router;
