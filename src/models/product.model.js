// models/product.model.js
import { pool } from "../dataBase/conection.js";

const createProduct = async ({ titulo, descripcion, precio, imagenUrl, stock }) => {
  const query = `
    INSERT INTO producto (titulo, descripcion, precio, "imagenUrl", stock, estado)
    VALUES ($1, $2, $3, $4, $5, true) RETURNING *;
  `;
  const values = [titulo, descripcion, precio, imagenUrl, stock];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const updateProduct = async (id, { titulo, descripcion, precio, imagenUrl, stock, estado }) => {
  const query = `
    UPDATE producto
    SET titulo = $1, descripcion = $2, precio = $3, "imagenUrl" = $4, stock = $5, estado = $6
    WHERE id = $7 RETURNING *;
  `;
  const values = [titulo, descripcion, precio, imagenUrl, stock, estado, id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const deleteProduct = async (id) => {
  const query = `
    DELETE FROM producto
    WHERE id = $1 RETURNING *;
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

export const productModel = {
  createProduct,
  updateProduct,
  deleteProduct,
};