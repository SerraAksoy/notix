const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller');
const authenticateToken = require('../middleware/auth.middleware');

router.post('/', authenticateToken, noteController.createNote);
router.get('/', authenticateToken, noteController.getNotes);
router.put('/:id', authenticateToken, noteController.updateNote);
router.delete('/:id', authenticateToken, noteController.deleteNote);
router.post('/:id/rollback', authenticateToken, noteController.rollbackNote);

module.exports = router;
