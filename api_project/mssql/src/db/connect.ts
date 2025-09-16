// db.js
import sql from 'mssql';

const config = {
  user: 'sa',
  password: 'P@ssw0rd22',
  server: 'LAPTOP-4LOAI4D3',   // e.g. 'localhost' or 'DESKTOP-123\\SQLEXPRESS'
  database: 'SAP',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

export async function connectDB() {
  try {
    const pool = await sql.connect(config);
    console.log('✅ Connected to SQL Server');
    return pool;
  } catch (err) {
    console.error('❌ Database connection failed:', err);
    throw err;
  }
}
