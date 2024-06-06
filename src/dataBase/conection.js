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
  connectionString: "postgres://kevin:6NHiwgw11NgcvFbS5Z0YDFljPkb3pEMM@dpg-cpgf54cf7o1s738e32n0-a/proyecto_final_full_stack",
  ssl:true
});


export default pool;