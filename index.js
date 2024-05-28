import express from "express";
import cors from "cors";
import "dotenv/config";
import todoRoute from "./routes/todo.route.js";
import userRoute from "./routes/user.route.js";

const PORT = process.env.PORT || 3500;
const app = express();

// Middleware para parsear el cuerpo de las peticiones
app.use(express.json());

// <--- Habilitamos CORS
app.use(cors());

app.use("/todos", todoRoute);
app.use("/users", userRoute);

app.listen(PORT, () => {
  console.log(`Todo app listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my API" });
});

export { app };