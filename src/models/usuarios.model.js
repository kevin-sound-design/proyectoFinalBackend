import { pool } from "../dataBase/conection.js";

// Get all users
const getAllUsers = async () => {
  const query = `
    SELECT u.id, u.email, d.direccion, u.nombre, u.apellido, u.rol, u.password
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
const updateUserById = async (id, { direccion, email }) => {
  const userUpdateQuery = email ? `
    UPDATE usuarios
    SET email = $1
    WHERE id = $2
    RETURNING *;
  ` : null;

  const addressUpdateQuery = direccion ? `
    UPDATE direcciones
    SET direccion = $1
    WHERE "id usuarios" = $2
    RETURNING *;
  ` : null;

  await pool.query("BEGIN");
  try {
    let userRows = [], addressRows = [];

    if (userUpdateQuery) {
      const userResult = await pool.query(userUpdateQuery, [email, id]);
      userRows = userResult.rows;
    }

    if (addressUpdateQuery) {
      const addressResult = await pool.query(addressUpdateQuery, [direccion, id]);
      addressRows = addressResult.rows;
    }

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
