const { body } = require('express-validator');

const validarComentario = [
  body('texto')
    .trim()
    .notEmpty().withMessage('El texto del comentario es requerido')
    .isLength({ min: 1, max: 1000 }).withMessage('El comentario debe tener entre 1 y 1000 caracteres'),
];

module.exports = { validarComentario };
