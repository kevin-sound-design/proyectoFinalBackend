import { Router } from "express";
import {galeriaController} from '../controllers/galeria.controller.js'


const router = Router()

router.get('/', galeriaController.getProducts);

router.get('/:id', galeriaController.getProductById);



export default router;