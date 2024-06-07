// controllers/order.controller.js
import { orderModel } from "../models/order.model.js";

const getOrdersByUserId = async (req, res) => {
  const { id } = req.params;

  try {
    console.log("Requesting user ID:", req.user.id);
    console.log("Requested user ID:", id);

    // If the requester is an admin, or if the requested user ID matches their own
    if (req.user.rol === "admin" || req.user.id === parseInt(id)) {
      const orders = await orderModel.getOrdersByUserId(id);
      return res.status(200).json({ pedidos: orders });
    } else {
      return res.status(403).json({ error: "Access denied. You can only view your own orders." });
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    console.log("Requested order ID:", id);

    const orderDetails = await orderModel.getOrderById(id);
    return res.status(200).json({ pedido: orderDetails.items, total: orderDetails.total });
  } catch (error) {
    console.error("Error fetching order details:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    // Only allow admins to access all orders
    if (req.user.rol !== "admin") {
      return res.status(403).json({ error: "Access denied. Only admins can view all orders." });
    }

    const orders = await orderModel.getAllOrders();
    return res.status(200).json({ pedidos: orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const orderController = {
  getOrdersByUserId,
  getOrderById,
  getAllOrders,
};
