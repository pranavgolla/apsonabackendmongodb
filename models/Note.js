const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  tags:{
    type:Object,
    required:false
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
