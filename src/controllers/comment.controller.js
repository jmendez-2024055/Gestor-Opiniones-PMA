const Comment = require('../models/Comment');
const Post = require('../models/Post');
const { crearError } = require('../middlewares/error.middleware');

const crearComentario = async (req, res, next) => {
  try {
    const publicacion = await Post.findById(req.params.postId);
    if (!publicacion) {
      return next(crearError('Publicación no encontrada.', 404));
    }

    const comentario = await Comment.create({
      texto: req.body.texto,
      autor: req.usuario._id,
      publicacion: req.params.postId,
    });

    await comentario.populate('autor', 'nombre username');

    res.status(201).json({
      success: true,
      message: 'Comentario creado exitosamente.',
      comentario,
    });
  } catch (error) {
    next(error);
  }
};

const listarComentarios = async (req, res, next) => {
  try {
    const publicacion = await Post.findById(req.params.postId);
    if (!publicacion) {
      return next(crearError('Publicación no encontrada.', 404));
    }

    const comentarios = await Comment.find({ publicacion: req.params.postId })
      .populate('autor', 'nombre username')
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      total: comentarios.length,
      comentarios,
    });
  } catch (error) {
    next(error);
  }
};

const editarComentario = async (req, res, next) => {
  try {
    const comentario = await Comment.findById(req.params.id);

    if (!comentario) {
      return next(crearError('Comentario no encontrado.', 404));
    }

    if (comentario.autor.toString() !== req.usuario._id.toString()) {
      return next(crearError('No tienes permiso para editar este comentario.', 403));
    }

    comentario.texto = req.body.texto;
    await comentario.save();
    await comentario.populate('autor', 'nombre username');

    res.status(200).json({
      success: true,
      message: 'Comentario actualizado exitosamente.',
      comentario,
    });
  } catch (error) {
    next(error);
  }
};

const eliminarComentario = async (req, res, next) => {
  try {
    const comentario = await Comment.findById(req.params.id);

    if (!comentario) {
      return next(crearError('Comentario no encontrado.', 404));
    }

    if (comentario.autor.toString() !== req.usuario._id.toString()) {
      return next(crearError('No tienes permiso para eliminar este comentario.', 403));
    }

    await Comment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Comentario eliminado exitosamente.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { crearComentario, listarComentarios, editarComentario, eliminarComentario };
