const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    texto: {
      type: String,
      required: [true, 'El texto del comentario es requerido'],
      trim: true,
      minlength: [1, 'El comentario no puede estar vacío'],
      maxlength: [1000, 'El comentario no puede superar 1000 caracteres'],
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    publicacion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Comment', commentSchema);
