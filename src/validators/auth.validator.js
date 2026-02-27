const { body } = require('express-validator');

const validarRegistro = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es requerido')
    .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres'),

  body('username')
    .trim()
    .notEmpty().withMessage('El username es requerido')
    .isLength({ min: 3, max: 30 }).withMessage('El username debe tener entre 3 y 30 caracteres')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('El username solo puede contener letras, números y guión bajo'),

  body('correo')
    .trim()
    .notEmpty().withMessage('El correo es requerido')
    .isEmail().withMessage('Formato de correo inválido')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('La contraseña es requerida')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];

const validarLogin = [
  body('identificador')
    .trim()
    .notEmpty().withMessage('El correo o username es requerido'),

  body('password')
    .notEmpty().withMessage('La contraseña es requerida'),
];

const validarActualizarPerfil = [
  body('nombre')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres'),

  body('username')
    .optional()
    .trim()
    .isLength({ min: 3, max: 30 }).withMessage('El username debe tener entre 3 y 30 caracteres')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('El username solo puede contener letras, números y guión bajo'),

  body('bio')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('La bio no puede superar 200 caracteres'),
];

const validarCambiarPassword = [
  body('passwordActual')
    .notEmpty().withMessage('La contraseña actual es requerida'),

  body('passwordNueva')
    .notEmpty().withMessage('La contraseña nueva es requerida')
    .isLength({ min: 6 }).withMessage('La nueva contraseña debe tener al menos 6 caracteres'),
];

module.exports = { validarRegistro, validarLogin, validarActualizarPerfil, validarCambiarPassword };
