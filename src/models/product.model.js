// models/product.model.js
import { pool } from "../dataBase/conection.js";
import { getActualQuery } from "../utils/queries.js";
const createProduct = async ({
  titulo,
  descripcion,
  precio,
  imagenUrl,
  stock,
}) => {
  const query = `
    INSERT INTO producto (titulo, descripcion, precio, "imagenUrl", stock, estado)
    VALUES ($1, $2, $3, $4, $5, true) RETURNING *;
  `;
  const values = [titulo, descripcion, precio, imagenUrl, stock];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const updateProduct = async (
  id,
  { titulo, descripcion, precio, imagenUrl, stock, estado }
) => {
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

const queryProductsByFilters = async ({
  minPrice,
  maxPrice,
  isNew,
  isUsed,
  categoria,
}) => {
  let filtros = [];
  const values = [];
  const tableProducts = "producto";
  const tableCategoriaProductos = '"categoria-producto"';
  const tablaCategorias = "categorias";

  console.log({
    minPrice,
    maxPrice,
    isNew,
    isUsed,
    categoria,
  });
  console.log(Boolean(isUsed && isNew), Boolean(isUsed), Boolean(isNew));
  console.log(typeof isNew, typeof isUsed);
  const agregarFiltro = (campo, comparador, valor) => {
    values.push(valor);
    const { length } = filtros;
    filtros.push(`${campo} ${comparador} $${length + 1}`);
  };
  if (maxPrice) agregarFiltro("a.precio", "<=", maxPrice);
  if (minPrice) agregarFiltro("a.precio", ">=", minPrice);
  if (categoria) agregarFiltro("c.categoria", "=", categoria);
  if (isUsed && isNew) {
    // agregarFiltro("a.estado", "in", "(true, false)");
  } else if (isUsed) {
    agregarFiltro("a.estado", "=", false);
  } else if (isNew) {
    agregarFiltro("a.estado", "=", true);
  }
  let consulta = `SELECT a.id, a.titulo, a.descripcion, a.precio, a."imagenUrl", a.stock, a.estado FROM ${tableProducts} a left join ${tableCategoriaProductos} b on a.id = b."id producto" left join ${tablaCategorias} c on b."id categoria" = c.id ${
    filtros.length ? " WHERE " : ""
  } ${filtros.join(" AND ")}`;

  console.log(getActualQuery(consulta, values));

  const { rows } = await pool.query(consulta, values);
  // console.log(rows);
  return rows;
};

const queryCategories = async () => {
  const query = `
    SELECT * FROM categorias;
  `;
  const { rows } = await pool.query(query);
  return rows;
};
export const productModel = {
  createProduct,
  updateProduct,
  deleteProduct,
  queryProductsByFilters,
  queryCategories,
};
