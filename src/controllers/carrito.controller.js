import pool from '../dataBase/conection.js';
import format from 'pg-format';

export const guardarPedidos = async (req, res) => {
  const pedido = req.body[0];
  const productoPedido = req.body[1];
  const formattedQueryPedidos = format(
    `INSERT INTO %I (%I, %I, %I, %I) VALUES (%L, %L, %L, %L) RETURNING %I`,
    "pedidos",
    "id usuarios",
    "id direcciones",
    "estado pedido",
    "total",
    pedido.idUsuario,
    pedido.idDireccion,
    pedido.estadoPedido,
    pedido.total,
    "id"
  );

  try {
    const { rows } = await pool.query(formattedQueryPedidos);
    const id = rows[0].id;

    const formattedQueries = productoPedido.map(e => {
      return format(
        `INSERT INTO %I (%I, %I, %I, %I, %I) VALUES (%L, %L, %L, %L, %L)`,
        "producto-pedidos",
        "id producto",
        "id pedidos",
        "cantidad",
        "precio unitario",
        "subTotal producto",
        e.id,
        id,
        e.cantidad,
        e.precioUnitario,
        e.subTotal
      );
    });

    const results = await Promise.all(formattedQueries.map(query => pool.query(query)));
    res.status(201).json(results);
  } catch (error) {
    console.error("Error al guardar pedidos:", error);
    res.status(500).json({ error: "Error al guardar pedidos" });
  }
};

export const carritoController = {
  guardarPedidos
}