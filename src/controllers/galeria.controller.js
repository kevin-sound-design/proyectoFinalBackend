import pool from '../dataBase/conection.js';
import format from 'pg-format';

const getProducts = async (req, res) =>{
  const formattedQuery = format("SELECT * FROM %I", "producto");
  const {rows} = await pool.query(formattedQuery);
  res.json(rows);
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