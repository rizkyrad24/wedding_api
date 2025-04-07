// const { Pool } = require('pg');

// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'wedding',
//     password: 'h44080082',
//     port: 5432,
// });

// pool.connect()
//     .then(() => console.log('✅ Connected to PostgreSQL'))
//     .catch(err => console.error('❌ Connection error:', err));

// module.exports = pool;

const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const openDb = async () => {
    const db = await open({
        filename: './wedding.db',
        driver: sqlite3.Database
    });

    // Buat tabel 'guests' jika belum ada
    await db.exec(`
        CREATE TABLE IF NOT EXISTS guests (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            status TEXT,
            note TEXT,
            date TEXT DEFAULT (datetime('now'))
        )
    `);

    return db;
};

module.exports = openDb;
