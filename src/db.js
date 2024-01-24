// import { createPool } from 'mysql2/promise';
// import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from './config.js';

// export const pool = createPool({
//     host: DB_HOST,
//     user: DB_USER,
//     password: DB_PASSWORD,
//     port: DB_PORT,
//     database: DB_DATABASE,
// });


import 'dotenv/config';
import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
    allowExitOnIdle: true,
})

try {
    await pool.query('SELECT NOW()')
    console.log("Base de Datos Conectada");
} catch (error) {
    console.log(error)
}