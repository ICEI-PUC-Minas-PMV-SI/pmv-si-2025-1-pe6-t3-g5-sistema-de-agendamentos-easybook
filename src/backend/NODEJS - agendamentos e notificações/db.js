// db.js
import mysql from 'mysql2/promise';
import 'dotenv/config';

const connection = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'nop1nop2',
  database: process.env.DB_NAME || 'teste'
});

export default connection;
