const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuarios'); // Importa el modelo
const bcrypt = require('bcrypt'); // Para encriptar contraseñas

// Ruta para mostrar la página de registro
router.get('/registro', (req, res) => {
    res.render('registro', { title: 'Registro', error: null });
});

// Ruta para procesar el registro de usuarios
router.post('/registro', async (req, res) => {
    const { username, email, password } = req.body; // Captura los datos enviados desde el formulario

    try {
        // Validar si los campos están vacíos
        if (!username || !email || !password) {
            return res.status(400).render('registro', {
                title: 'Registro',
                error: 'Todos los campos son obligatorios',
            });
        }

        // Verificar si el usuario o correo ya existen en la base de datos
        const usuarioExistente = await Usuario.findOne({ $or: [{ name: username }, { email }] });
        if (usuarioExistente) {
            return res.status(400).render('registro', {
                title: 'Registro',
                error: 'El usuario o correo ya existe',
            });
        }

        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const nuevoUsuario = new Usuario({
            name: username,
            email: email,
            password: hashedPassword,
        });

        // Guardar el usuario en la base de datos
        await nuevoUsuario.save();

        // Redirigir al login después de registrarse
        res.redirect('/');
    } catch (error) {
        console.error('Error al registrar usuario:', error);

        // Manejar errores como índices únicos duplicados
        if (error.code === 11000) {
            return res.status(400).render('registro', {
                title: 'Registro',
                error: 'El usuario o correo ya existe',
            });
        }

        res.status(500).render('registro', {
            title: 'Registro',
            error: 'Hubo un error al procesar tu solicitud. Intenta nuevamente.',
        });
    }
});

module.exports = router;
