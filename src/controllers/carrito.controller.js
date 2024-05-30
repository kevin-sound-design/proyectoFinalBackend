import pool from '../dataBase/conection.js';
import format from 'pg-format';

const guardarPedidos = async (req, res) => {
  const pedido = req.body[0];
  const productoPedido = req.body[1];
  const formattedQueryPedidos = format(
    `INSERT INTO %I (%I, %I) VALUES (${pedido.estadoPedido}, %L) RETURNING %I`,
    "pedidos",
    "estado pedido",
    "total",
    pedido.total,
    "id"
  );

  const formattedQueries = await Promise.all(productoPedido.map(e => {
    return format(
      `INSERT INTO %I (%I, %I, %I, %I, %I) VALUES (%L, %L, %L, %L, %L)`,
      "producto-pedidos",
      "id_producto",
      "id_pedidos",
      "cantidad",
      "precio_unitario",
      "subTotal_producto",
      e.id,
      "10",
      e.cantidad,
      e.precioUnitario,
      e.subTotal
    );
  }));



  res.send(formattedQueries)
}


export const carritoController = {
  guardarPedidos
}