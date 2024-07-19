const express = require('express');
const router = express.Router();
const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  
} = require('../controllers/noteController');

router.post('/', createNote);
router.get('/', getNotes);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
// Routes for archived notes
// router.get('/notes/archived', getArchivedNotes);
// router.put('/notes/archive/:id', updateArchivedStatus);
// router.delete('/notes/archive/:id', deleteArchivedNote);

// getArchivedNotes,
//   updateArchivedStatus,
//   deleteArchivedNote
module.exports = router;
