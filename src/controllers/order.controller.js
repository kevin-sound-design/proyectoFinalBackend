import { orderModel } from "../models/order.model.js";

const getOrdersByUserId = async (req, res) => {
  const { id } = req.params;

  // Check if the requester is an admin or if the requested user ID matches their own
  if (req.user.rol !== "admin" && req.user.id !== id) {
    return res.status(403).json({ error: "Access denied. You can only view your own orders." });
  }

  try {
    const orders = await orderModel.getOrdersByUserId(id);
    return res.status(200).json({ pedidos: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;

  // If the requester is not an admin, they can only access their own orders
  if (req.user.rol !== "admin" && req.user.id !== id) {
    return res.status(403).json({ error: "Access denied. You can only view your own orders." });
  }

  try {
    const orderDetails = await orderModel.getOrderById(id);
    return res.status(200).json({ pedido: orderDetails.items, total: orderDetails.total });
  } catch (error) {
    console.error("Error fetching order details:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const orderController = {
  getOrdersByUserId,
  getOrderById,
};
