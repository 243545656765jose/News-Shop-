const mongoose = require('mongoose');

// Define el esquema de Noticia
const noticiaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true,
    },
    contenido: {
        type: String,
        required: true,
    },
    imagen: {
        type: String, // Ruta de la imagen subida
    },
    fechaPublicacion: {
        type: Date,
        default: Date.now, // Fecha de creación por defecto
    },
    autor: {
        type: String,
        required: true,
    },
});

// Crea y exporta el modelo
const Noticia = mongoose.model('Noticia', noticiaSchema);
module.exports = Noticia;
