import { usuariosModel } from "../models/usuarios.model.js";

// Get all users (for admin only)
const getAllUsers = async (req, res) => {
  try {
    if (req.user.rol !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }
    const users = await usuariosModel.getAllUsers();
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Get user by ID (for general users and admin)
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    let user;
    if (req.user.rol === "admin") {
      user = await usuariosModel.getUserById(id, true); // Include role
    } else {
      user = await usuariosModel.getUserById(id, false); // Exclude role
      if (req.user.id !== user.id) {
        return res.status(403).json({ error: "Access denied" });
      }
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Update user by ID (for general users and admin)
const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { direccion, nombre, apellido, password } = req.body;
  try {
    if (req.user.rol !== "admin" && req.user.id !== parseInt(id, 10)) {
      return res.status(403).json({ error: "Access denied" });
    }
    const updatedUser = await usuariosModel.updateUserById(id, { direccion, nombre, apellido, password });
    return res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const usuariosController = {
  getAllUsers,
  getUserById,
  updateUserById,
};
