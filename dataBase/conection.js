import pkg from "pg";
import "dotenv/config";
const { Pool } = pkg;

const connectionString = process.env.PG_STRING_URL;
// cambia los datos de acuerdo a tu configuración de postgres
export const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  allowExitOnIdle: true,
});

try {
  await pool.query("SELECT NOW()");
  console.log("Database connected");
} catch (error) {
  console.log(error);
}
