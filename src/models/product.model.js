// models/product.model.js
import { pool } from "../dataBase/conection.js";
import { getActualQuery } from "../utils/queries.js";
import format from 'pg-format';

const createProduct = async ({
  titulo,
  descripcion,
  precio,
  imagenUrl,
  stock,
  estado,
  categoria
}) => {
  const client = await pool.connect();

  try {
    // Inicia una transacción
    await client.query('BEGIN');

    // Paso 1: Obtener el id de la categoría
    const formattedQueryCategoria = format(
      `SELECT %I FROM %I WHERE %I = %L`,
      "id",
      "categorias",
      "categoria",
      categoria
    );
    

    const categoriaResult = await client.query(formattedQueryCategoria);
    if (categoriaResult.rows.length === 0) {
      throw new Error('Categoría no encontrada');
    }
    const categoriaId = categoriaResult.rows[0].id;

    // Paso 2: Insertar el producto y obtener su id
    const formattedQueryProducto = format(
      `INSERT INTO %I (%I, %I, %I, %I, %I, %I) VALUES (%L, %L, %L, %L, %L, %L) RETURNING %I`,
      "producto",
      "titulo",
      "descripcion",
      "precio",
      "imagenUrl",
      "stock",
      "estado",
      titulo,
      descripcion,
      precio,
      imagenUrl,
      stock,
      estado,
      "id"
    );

    const productoResult = await client.query(formattedQueryProducto);
    const productoId = productoResult.rows[0].id;

    // Paso 3: Insertar en la tabla intermedia categoria_producto
    const formattedQueryIntermedia = format(
      `INSERT INTO %I (%I, %I) VALUES (%L, %L)`,
      "categoria-producto",
      "id categoria",
      "id producto",
      categoriaId,
      productoId
    );

    await client.query(formattedQueryIntermedia);

    // Confirmar la transacción
    await client.query('COMMIT');

    return productoId;
  } catch (error) {
    // En caso de error, deshacer la transacción
    await client.query('ROLLBACK');
    console.error('Error creating product:', error);
    throw error;
  } finally {
    client.release();
  }
};

export { createProduct };

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
  // console.log(Boolean(isUsed && isNew), Boolean(isUsed), Boolean(isNew));
  // console.log(typeof isNew, typeof isUsed);
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
