const express = require('express');
const router = express.Router();
const notebookController = require('../controllers/notebook.controller');
const authenticateToken = require('../middleware/auth.middleware');

router.post('/', authenticateToken, notebookController.createNotebook);
router.get('/', authenticateToken, notebookController.getNotebooks);
router.put('/:id', authenticateToken, notebookController.updateNotebook);
router.delete('/:id', authenticateToken, notebookController.deleteNotebook);

module.exports = router;
