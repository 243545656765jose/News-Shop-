const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuarios'); // Importa el modelo de usuario
const bcrypt = require('bcrypt'); // Para verificar contraseñas encriptadas

// Usuario quemado
const USUARIO_QUEMADO = {
    name: 'admin',
    password: 'admin', // Contraseña predefinida
    redireccion: '/noticias/menuA', // Página a la que será redirigido el usuario quemado
};

// Procesar inicio de sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verificar si es el usuario quemado
        if (username === USUARIO_QUEMADO.name && password === USUARIO_QUEMADO.password) {
            return res.redirect(USUARIO_QUEMADO.redireccion); // Redirigir al área de administración
        }

        // Verificar usuario en la base de datos
        const usuario = await Usuario.findOne({ name: username });
        if (!usuario) {
            return res.status(401).render('login', {
                title: 'Inicio',
                error: 'Usuario no encontrado',
            });
        }

        // Verificar contraseña
        const passwordCorrecto = await bcrypt.compare(password, usuario.password);
        if (!passwordCorrecto) {
            return res.status(401).render('login', {
                title: 'Inicio',
                error: 'Contraseña incorrecta',
            });
        }

        // Redirigir a noticias para usuarios regulares
        res.redirect('/noticias');
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).render('login', {
            title: 'Inicio',
            error: 'Error en el servidor',
        });
    }
});

module.exports = router;
