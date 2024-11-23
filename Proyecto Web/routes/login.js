const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuarios'); // Importa tu modelo de usuarios
const bcrypt = require('bcrypt'); // Importa bcrypt para comparar contraseñas encriptadas

// Ruta para procesar el inicio de sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body; // Captura los datos ingresados

    try {
        // Busca el usuario por su nombre en la base de datos
        const usuario = await Usuario.findOne({ name: username });

        if (!usuario) {
            // Si el usuario no existe
            return res.status(401).render('login', { 
                title: 'Inicio', 
                error: 'Usuario no encontrado' 
            });
        }

        // Verifica la contraseña ingresada contra la contraseña encriptada
        const passwordCorrecto = await bcrypt.compare(password, usuario.password);

        if (!passwordCorrecto) {
            // Si la contraseña es incorrecta
            return res.status(401).render('login', { 
                title: 'Inicio', 
                error: 'Contraseña incorrecta' 
            });
        }

        // Si las credenciales son correctas, redirige a `/noticias`
        res.redirect('/noticias');
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).render('login', { 
            title: 'Inicio', 
            error: 'Error en el servidor, por favor intente de nuevo' 
        });
    }
});

module.exports = router;
