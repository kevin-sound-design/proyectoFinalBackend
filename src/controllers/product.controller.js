// controllers/product.controller.js
import { productModel } from "../models/product.model.js";
import { createProduct } from "../models/product.model.js";

const createProductController = async (req, res) => {
  const { titulo, descripcion, precio, imagenUrl, stock, estado } = req.body;

  if (!titulo || !descripcion || !precio || !imagenUrl || !stock || estado === undefined) {
    return res.status(400).json({ error: "All fields are required, including 'estado'" });
  }

  try {
    const newProduct = await createProduct({ titulo, descripcion, precio, imagenUrl, stock, estado });
    return res.status(201).json({ message: "Product created successfully", newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: error.message });
  }
};

export { createProductController };


const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, precio, imagenUrl, stock, estado } = req.body;

  if (!titulo || !descripcion || !precio || !imagenUrl || !stock || estado === undefined) {
    return res.status(400).json({ error: "All fields are required, including 'estado'" });
  }

  try {
    const updatedProduct = await productModel.updateProduct(id, { titulo, descripcion, precio, imagenUrl, stock, estado });
    return res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await productModel.deleteProduct(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const productController = {
  createProduct,
  updateProduct,
  deleteProduct,
};
