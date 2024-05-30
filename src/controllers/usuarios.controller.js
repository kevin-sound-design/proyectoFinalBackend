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
  let { id } = req.params;
  try {
    if (req.user.rol === "admin") {
      // Admin can fetch any user's data
      const user = await usuariosModel.getUserById(id, true); // Include role
      return res.status(200).json({ user });
    } else {
      // Cliente can only fetch their own data
      id = req.user.id;
      const user = await usuariosModel.getUserById(id, false); // Exclude role
      return res.status(200).json({ user });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Update user by ID (for general users and admin)
const updateUserById = async (req, res) => {
  let { id } = req.params;
  const { direccion, email } = req.body;

  try {
    if (req.user.rol === "admin") {
      // Admins can update any user
      const updatedUser = await usuariosModel.updateUserById(id, { direccion, email });
      return res.status(200).json({ message: "User updated successfully", updatedUser });
    } else if (req.user.rol === "cliente") {
      // Regular users can only update their own information
      id = req.user.id;
      const updatedUser = await usuariosModel.updateUserById(id, { direccion, email });
      return res.status(200).json({ message: "User updated successfully", updatedUser });
    } else {
      return res.status(403).json({ error: "Access denied" });
    }
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
