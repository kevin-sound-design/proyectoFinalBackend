import pool from '../dataBase/conection.js';
import format from 'pg-format';

const getProducts = async (req, res) =>{
  try {
    const formattedQuery = format("SELECT * FROM %I", "producto");
    const { rows } = await pool.query(formattedQuery);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
}

const getProductById = async (req, res) =>{
  const productId = req.params.id;
  const formattedQuery = format("SELECT * FROM %I WHERE id = %L", "producto", productId );
  const {rows} = await pool.query(formattedQuery);
  res.json(rows);
}

export const galeriaController = {
  getProducts,
  getProductById
}