import { pool } from "../dataBase/conection.js";
const findOneEmail = async (email) => {
  const query = "SELECT * FROM usuarios WHERE email = $1";
  const { rows } = await pool.query(query, [email]);
  return rows[0];
};

const create = async ({
  email,
  password,
  nombre,
  apellido,
  rol = "cliente",
  direccion,
}) => {
  const queryUser =
    "INSERT INTO usuarios (nombre, apellido, password, email, rol) VALUES ($1, $2, $3, $4, $5) RETURNING *";
  const { rows } = await pool.query(queryUser, [
    nombre,
    apellido,
    password,
    email,
    rol,
  ]);

  const user = rows[0];
  console.log(user);

  const queryAddress =
    'INSERT INTO direcciones ("id usuarios", direccion) VALUES ($1, $2) RETURNING *';
  const { rows: rowsAddress } = await pool.query(queryAddress, [
    user.id,
    direccion,
  ]);

  return user;
};

export const userModel = {
  findOneEmail,
  create,
};
