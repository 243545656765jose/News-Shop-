const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuarios'); // Importa el modelo de usuario
const bcrypt = require('bcrypt'); // Para verificar contraseñas encriptadas

// Procesar inicio de sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verificar usuario
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

        // Redirigir a noticias
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
