import { pool } from "../dataBase/conection.js";

// Get all orders by a specific user ID
const getOrdersByUserId = async (userId) => {
  const query = `
    SELECT id AS "ID pedido", fecha, total
    FROM pedidos
    WHERE "id usuarios" = $1;
  `;
  const { rows } = await pool.query(query, [userId]);
  return rows;
};

// Get order details by order ID
const getOrderById = async (orderId) => {
  const orderQuery = `
    SELECT p.id AS "ID producto", p.titulo, p.precio, pp.cantidad, pp."subTotal producto" AS subtotal
    FROM producto p
    JOIN "producto-pedidos" pp ON p.id = pp."id producto"
    WHERE pp."id pedidos" = $1;
  `;
  const { rows: orderItems } = await pool.query(orderQuery, [orderId]);

  const totalQuery = `
    SELECT total
    FROM pedidos
    WHERE id = $1;
  `;
  const { rows: totalRows } = await pool.query(totalQuery, [orderId]);

  return { items: orderItems, total: totalRows[0].total };
};

// Get all orders
const getAllOrders = async () => {
  const query = `
    SELECT id AS "ID pedido", "id usuarios" AS "Usuario", fecha, total
    FROM pedidos;
  `;
  const { rows } = await pool.query(query);
  return rows;
};

export const orderModel = {
  getOrdersByUserId,
  getOrderById,
  getAllOrders,
};
