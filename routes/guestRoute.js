const router = require('express').Router();
const {
    addGuest,
    getAllGuests,
    getGuestById,
    updateGuest,
    deleteGuest
} = require('../models/guestModel.js'); // Menggunakan fungsi dari guestModel.js

// GET: Ambil semua tamu
router.get('/', async (req, res) => {
    try {
        const data = await getAllGuests();
        res.status(200).json({ status: 'success', data });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
});

// GET: Ambil tamu berdasarkan ID
router.get('/:guestId', async (req, res) => {
    try {
        const data = await getGuestById(req.params.guestId);
        if (!data) {
            return res.status(404).json({ status: 'error', message: 'Guest not found' });
        }
        res.status(200).json({ status: 'success', data });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
});

// POST: Tambah tamu baru
router.post('/', async (req, res) => {
    const { name, status, note } = req.body;
    try {
        const savedData = await addGuest(name, status, note);
        res.status(201).json({ status: 'success', data: savedData });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
});

// PATCH: Edit tamu berdasarkan ID
router.patch('/:guestId', async (req, res) => {
    const { status, note } = req.body;
    try {
        const updatedData = await updateGuest(req.params.guestId, status, note);
        if (!updatedData) {
            return res.status(404).json({ status: 'error', message: 'Guest not found' });
        }
        res.status(200).json({ status: 'success', data: updatedData });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
});

// DELETE: Hapus tamu berdasarkan ID
router.delete('/:guestId', async (req, res) => {
    console.log(req.params);
    try {
        const result = await deleteGuest(req.params.guestId);
        res.status(200).json({ status: 'success', message: result.message });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
});

module.exports = router;