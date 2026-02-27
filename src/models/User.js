const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es requerido'],
      trim: true,
      minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
      maxlength: [50, 'El nombre no puede superar 50 caracteres'],
    },
    username: {
      type: String,
      required: [true, 'El nombre de usuario es requerido'],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [3, 'El username debe tener al menos 3 caracteres'],
      maxlength: [30, 'El username no puede superar 30 caracteres'],
      match: [/^[a-zA-Z0-9_]+$/, 'El username solo puede contener letras, números y guión bajo'],
    },
    correo: {
      type: String,
      required: [true, 'El correo es requerido'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Formato de correo inválido'],
    },
    password: {
      type: String,
      required: [true, 'La contraseña es requerida'],
      minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
      select: false,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [200, 'La bio no puede superar 200 caracteres'],
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Encriptar contraseña antes de guardar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar contraseñas
userSchema.methods.compararPassword = async function (passwordIngresada) {
  return await bcrypt.compare(passwordIngresada, this.password);
};

module.exports = mongoose.model('User', userSchema);
