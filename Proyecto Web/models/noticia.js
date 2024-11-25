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
        type: String, 
    },
    fechaPublicacion: {
        type: Date,
        default: Date.now, 
    },
    autor: {
        type: String,
        required: true,
    },
    categoria: {
        type: String,
        required: true,
        enum: ['Deportes', 'Política', 'Entretenimiento', 'Ciencia', 'Tecnología', 'Economía'], 
    },
});

// Crea y exporta el modelo
const Noticia = mongoose.model('Noticia', noticiaSchema);
module.exports = Noticia;
