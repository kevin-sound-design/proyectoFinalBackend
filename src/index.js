import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import galeriaRouter from "./routes/galeria.router.js";
import userRouter from "./routes/user.router.js";
import carritoRouter from './routes/carrito.router.js'
import productRouter from "./routes/product.router.js";
import orderRouter from "./routes/order.router.js";  
import usuariosRouter from "./routes/usuarios.router.js"


//cargando variable de entorno
dotenv.config();

const PORT = process.env.PORT || 3500;
const app = express();

// Middleware para parsear el cuerpo de las peticiones
app.use(express.json());

// <--- Habilitamos CORS
app.use(cors());

// usar los routers
app.use("/productos", galeriaRouter);
app.use("/user", userRouter);
app.use("/carrito", carritoRouter)
app.use("/productos/CRUD", productRouter);
app.use("/pedidos", orderRouter);  
app.use("/usuarios", usuariosRouter)

app.listen(PORT, () => {
  console.log(`Servidor levantado en puerto ${PORT}`);
});

export { app };
