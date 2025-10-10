import mysq from 'mysql2/promise'
const pool =mysq.createPool({
host: process.env.DB_HOST || 'localhost' ,
port: process.env.DB_PORT || 3306,
user: process.env.DB_USER || 'root',
password: process.env.DB_PASS || '123leo',
database: process.env.DB_NAME || 'backend'
})

export default pool;
