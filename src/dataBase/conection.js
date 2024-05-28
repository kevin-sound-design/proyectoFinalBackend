import pkg from "pg";
import "dotenv/config";
const { Pool } = pkg;
import dotenv from 'dotenv'

dotenv.config();

export const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  allowExitOnIdle: true,
});


export default pool;