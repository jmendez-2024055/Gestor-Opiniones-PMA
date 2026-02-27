const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protegerRuta = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado. Por favor inicia sesión.',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const usuario = await User.findById(decoded.id);
    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: 'El usuario de este token ya no existe.',
      });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado.',
    });
  }
};

module.exports = { protegerRuta };
