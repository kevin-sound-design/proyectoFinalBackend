import { orderModel } from "../models/order.model.js";

const getOrdersByUserId = async (req, res) => {
  const userId = req.params.id;
  try {
    const orders = await orderModel.getOrdersByUserId(userId);
    return res.status(200).json({ pedidos: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  const orderId = req.params.id;
  try {
    const orderDetails = await orderModel.getOrderById(orderId);
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
