// const pool = require('../db.js'); // Import koneksi PostgreSQL

// // Fungsi untuk menambahkan guest
// const addGuest = async (name, status, note) => {
//     const query = `
//         INSERT INTO guests (name, status, note, date) 
//         VALUES ($1, $2, $3, NOW()) 
//         RETURNING *`;
//     const values = [name, status, note];

//     try {
//         const result = await pool.query(query, values);
//         return result.rows[0]; // Mengembalikan guest yang baru ditambahkan
//     } catch (err) {
//         console.error('Error inserting guest:', err);
//         throw err;
//     }
// };

// // Fungsi untuk mendapatkan semua guest
// const getAllGuests = async () => {
//     try {
//         const result = await pool.query('SELECT * FROM guests ORDER BY date DESC');
//         return result.rows;
//     } catch (err) {
//         console.error('Error fetching guests:', err);
//         throw err;
//     }
// };

// // Fungsi untuk mendapatkan guest berdasarkan ID
// const getGuestById = async (id) => {
//     try {
//         const result = await pool.query('SELECT * FROM guests WHERE id = $1', [id]);
//         return result.rows[0];
//     } catch (err) {
//         console.error('Error fetching guest:', err);
//         throw err;
//     }
// };

// // Fungsi untuk memperbarui guest
// const updateGuest = async (id, status, note) => {
//     const query = `
//         UPDATE guests 
//         SET status = $1, note = $2 
//         WHERE id = $3 RETURNING *`;
//     const values = [ status, note, id];

//     try {
//         const result = await pool.query(query, values);
//         return result.rows[0];
//     } catch (err) {
//         console.error('Error updating guest:', err);
//         throw err;
//     }
// };

// // Fungsi untuk menghapus guest
// const deleteGuest = async (id) => {
//     try {
//         await pool.query('DELETE FROM guests WHERE id = $1', [id]);
//         return { message: 'Guest deleted successfully' };
//     } catch (err) {
//         console.error('Error deleting guest:', err);
//         throw err;
//     }
// };

// module.exports = {
//     addGuest,
//     getAllGuests,
//     getGuestById,
//     updateGuest,
//     deleteGuest
// };


const openDb = require('../db.js'); // Import koneksi SQLite
const { v4: uuidv4 } = require('uuid'); // import uuid

// Fungsi untuk menambahkan guest
const addGuest = async (name, status, note) => {
    const db = await openDb();
    const id = uuidv4(); // generate UUID
    const query = `
        INSERT INTO guests (id, name, status, note, date)
        VALUES (?, ?, ?, ?, datetime('now'))`;

    try {
        await db.run(query, [id, name, status, note]);
        const newGuest = await db.get('SELECT * FROM guests WHERE id = ?', [id]);
        return newGuest;
    } catch (err) {
        console.error('Error inserting guest:', err);
        throw err;
    }
};

// Fungsi untuk mendapatkan semua guest
const getAllGuests = async () => {
    const db = await openDb();

    try {
        const guests = await db.all('SELECT * FROM guests ORDER BY date DESC');
        return guests;
    } catch (err) {
        console.error('Error fetching guests:', err);
        throw err;
    }
};

// Fungsi untuk mendapatkan guest berdasarkan ID
const getGuestById = async (id) => {
    const db = await openDb();

    try {
        const guest = await db.get('SELECT * FROM guests WHERE id = ?', [id]);
        return guest;
    } catch (err) {
        console.error('Error fetching guest:', err);
        throw err;
    }
};

// Fungsi untuk memperbarui guest
const updateGuest = async (id, status, note) => {
    const db = await openDb();
    const query = `
        UPDATE guests
        SET status = ?, note = ?
        WHERE id = ?`;

    try {
        await db.run(query, [status, note, id]);
        const updatedGuest = await db.get('SELECT * FROM guests WHERE id = ?', [id]);
        return updatedGuest;
    } catch (err) {
        console.error('Error updating guest:', err);
        throw err;
    }
};

// Fungsi untuk menghapus guest
const deleteGuest = async (id) => {
    const db = await openDb();

    try {
        await db.run('DELETE FROM guests WHERE id = ?', [id]);
        return { message: 'Guest deleted successfully' };
    } catch (err) {
        console.error('Error deleting guest:', err);
        throw err;
    }
};

module.exports = {
    addGuest,
    getAllGuests,
    getGuestById,
    updateGuest,
    deleteGuest
};