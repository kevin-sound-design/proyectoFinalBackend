import bcript from "bcryptjs";
import { userModel } from "../models/user.model.js";
import "dotenv/config";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  try {
    const user = await userModel.findOneEmail(email);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcript.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const payload = {
      email,
      user_id: user.id,
      rol: user.rol
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const register = async (req, res) => {
  const { email, password, nombre, apellido, direccion } = req.body;
  if (!email || !password || !nombre || !apellido || !direccion) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const user = await userModel.findOneEmail(email);
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcript.hash(password, 10);
    const newUser = await userModel.create({
      email,
      password: hashedPassword,
      nombre,
      apellido,
      direccion,
    });
    const payload = {
      email,
      user_id: newUser.id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    return res.status(201).json({ message: "User created", token, newUser });
  } catch (error) {
    console.log(error);
    if (error.code === "23505") {
      return res.status(400).json({ message: "User already exists" });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const userController = {
  login,
  register,
};
