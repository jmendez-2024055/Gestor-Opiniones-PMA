require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const { manejarErrores } = require('./middlewares/error.middleware');

// Rutas
const authRoutes = require('./routes/auth.routes');
// const postRoutes = require('./routes/post.routes');
// const commentRoutes = require('./routes/comment.routes');

const app = express();

// Conectar a MongoDB
connectDB();

// Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas principales
app.use('/api/auth', authRoutes);
// app.use('/api/publicaciones', postRoutes);
// app.use('/api/comentarios', commentRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API Sistema de Opiniones - Funcionando',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      publicaciones: '/api/publicaciones',
      comentarios: '/api/comentarios',
    },
  });
});

// Ruta no encontrada
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta ${req.originalUrl} no encontrada.`,
  });
});

// Middleware global de errores (debe ir al final)
app.use(manejarErrores);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
