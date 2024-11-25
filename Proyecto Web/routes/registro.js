const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuarios'); // Importa el modelo
const bcrypt = require('bcrypt'); // Para encriptar contraseñas

// Mostrar el formulario de registro
router.get('/registro', (req, res) => {
    res.render('registro', { title: 'Registro', error: null });
});

// Procesar el registro de usuario
router.post('/registro', async (req, res) => {
    const { name, email, password } = req.body;

    try {

        // Validar si los campos están vacíos
        if (!name || !email || !password) {
            console.log('Faltan campos'); // Depuración
            return res.status(400).render('registro', {
                title: 'Registro',
                error: 'Todos los campos son obligatorios.',
            });
        }

        // Verificar si el usuario o correo ya existen
        const usuarioExistente = await Usuario.findOne({ $or: [{ name }, { email }] });

        if (usuarioExistente) {
            return res.status(400).render('registro', {
                title: 'Registro',
                error: 'El usuario o correo ya existe.',
            });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const nuevoUsuario = new Usuario({
            name,
            email,
            password: hashedPassword,
        });

        // Guardar el usuario en la base de datos
        await nuevoUsuario.save();

        // Redirigir al login después del registro
        res.redirect('http://localhost:3000');
    } catch (error) {

        // Manejo de errores
        if (error.code === 11000) {
            return res.status(400).render('registro', {
                title: 'Registro',
                error: 'El usuario o correo ya existe.',
            });
        }

        // Otros errores
        res.status(500).render('registro', {
            title: 'Registro',
            error: 'Hubo un error al procesar tu solicitud. Intenta nuevamente.',
        });
    }
});


module.exports = router;
