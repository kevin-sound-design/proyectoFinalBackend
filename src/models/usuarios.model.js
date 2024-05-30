import { pool } from "../dataBase/conection.js";

// Get all users
const getAllUsers = async () => {
  const query = `
    SELECT u.id, u.email, d.direccion, u.nombre, u.apellido, u.rol
    FROM usuarios u
    LEFT JOIN direcciones d ON u.id = d."id usuarios";
  `;
  const { rows } = await pool.query(query);
  return rows;
};

// Get user by ID
const getUserById = async (id, includeRole = false) => {
  const query = `
    SELECT u.id, u.email, d.direccion, u.nombre, u.apellido${includeRole ? ", u.rol" : ""}
    FROM usuarios u
    LEFT JOIN direcciones d ON u.id = d."id usuarios"
    WHERE u.id = $1;
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

// Update user by ID
const updateUserById = async (id, { direccion, nombre, apellido, password }) => {
  const userUpdateQuery = `
    UPDATE usuarios
    SET nombre = $1, apellido = $2, password = $3
    WHERE id = $4
    RETURNING *;
  `;
  const addressUpdateQuery = `
    UPDATE direcciones
    SET direccion = $1
    WHERE "id usuarios" = $2
    RETURNING *;
  `;

  await pool.query("BEGIN");
  try {
    const { rows: userRows } = await pool.query(userUpdateQuery, [nombre, apellido, password, id]);
    const { rows: addressRows } = await pool.query(addressUpdateQuery, [direccion, id]);
    await pool.query("COMMIT");
    return { user: userRows[0], address: addressRows[0] };
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
};

export const usuariosModel = {
  getAllUsers,
  getUserById,
  updateUserById,
};
