import pkg from "pg";
import "dotenv/config";
const { Pool } = pkg;
import dotenv from 'dotenv'

dotenv.config();

export const pool = new Pool({
  /* user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  allowExitOnIdle: true, */
  connectionString: process.env.INTERNALURL,
  ssl: true
});

pool.connect((err, client, release) => { if (err) { return console.error('Error adquiriendo cliente', err.stack); } console.log('Conectado a la base de datos'); release(); });

export default pool;