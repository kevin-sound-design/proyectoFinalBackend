import pool from "../dataBase/conection.js";
import format from "pg-format";

import { productModel } from "../models/product.model.js";

const getProducts = async (req, res) => {
  const formattedQuery = format("SELECT * FROM %I", "producto");
  const { rows } = await pool.query(formattedQuery);
  res.json(rows);
};

const getProductById = async (req, res) => {
  const productId = req.params.id;
  const formattedQuery = format(
    "SELECT * FROM %I WHERE id = %L",
    "producto",
    productId
  );
  const { rows } = await pool.query(formattedQuery);
  res.json(rows);
};

const getProductsByFilters = async (req, res) => {
  const { minPrice, maxPrice, isNew, isUsed, categoria } = req.query;
  try {
    const products = await productModel.queryProductsByFilters({
      minPrice,
      maxPrice,
      isNew,
      isUsed,
      categoria,
    });

    if (!products || products.length === 0)
      return res.status(200).json({ message: "No products found" });
    return res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const galeriaController = {
  getProducts,
  getProductById,
  getProductsByFilters,
};
