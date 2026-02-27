const { body } = require('express-validator');

const validarPublicacion = [
  body('titulo')
    .trim()
    .notEmpty().withMessage('El título es requerido')
    .isLength({ min: 3, max: 150 }).withMessage('El título debe tener entre 3 y 150 caracteres'),

  body('categoria')
    .trim()
    .notEmpty().withMessage('La categoría es requerida')
    .isIn(['Tecnología', 'Política', 'Deportes', 'Entretenimiento', 'Ciencia', 'Educación', 'Salud', 'General'])
    .withMessage('Categoría inválida. Opciones: Tecnología, Política, Deportes, Entretenimiento, Ciencia, Educación, Salud, General'),

  body('texto')
    .trim()
    .notEmpty().withMessage('El texto principal es requerido')
    .isLength({ min: 10, max: 5000 }).withMessage('El texto debe tener entre 10 y 5000 caracteres'),
];

module.exports = { validarPublicacion };
