const Note = require('../models/Note');

exports.createNote = async (req, res) => {
  const { content, userEmail,tags } = req.body;
  try {
    const newNote = new Note({
      content,
      userEmail,tags
    });

    const note = await newNote.save();
    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getNotes = async (req, res) => {
  const { userEmail } = req.query;
  try {
    const notes = await Note.find({ userEmail }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getNoteById = async (req, res) => {
  const { userEmail } = req.query;
  try {
    const note = await Note.findOne({ _id: req.params.id, userEmail });

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    res.json(note);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Note not found' });
    }
    res.status(500).send('Server error');
  }
};

exports.updateNote = async (req, res) => {
  const { content, userEmail, isArchived,tags } = req.body;

  try {
    let note = await Note.findOne({ _id: req.params.id, userEmail });

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    // Update fields only if they are provided
    if (content !== undefined) {
      note.content = content;
    }
    if (isArchived !== undefined) {
      note.isArchived = isArchived;
    }
    if (tags!==undefined){
      note.tags=tags
    }

    await note.save();
    res.json(note);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Note not found' });
    }
    res.status(500).send('Server error');
  }
};


exports.deleteNote = async (req, res) => {
  const { userEmail } = req.body;
  try {
    let note = await Note.findOne({ _id: req.params.id, userEmail });

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    await Note.findOneAndRemove({ _id: req.params.id, userEmail });

    res.json({ msg: 'Note removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Note not found' });
    }
    res.status(500).send('Server error');
  }
};
