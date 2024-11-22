const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    name: {
        type: String,
        required: true, // Corrige 'require' a 'required'
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
