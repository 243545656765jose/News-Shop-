const express = require('express')
const router = express.Router()
const Usuario = require('../models/usuarios')

router.get('/login', async (req, res) => {
    try {
        const users = await Usuario.find(); 
        res.render('login', { users }); 
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).send('Error al obtener usuarios');
    }
});


router.get('/registro', (req, res) => {
    res.render('registro'); 
});

router.get('/addNoticia', (req, res) => {
    res.render('addNoticia'); 
});


router.post('/registro', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const nuevoUsuario = new Usuario({ name, email, password });
        await nuevoUsuario.save();
        console.log('Usuario registrado:', nuevoUsuario);
        res.redirect('/login');
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).send('Error al registrar usuario');
    }
});






router.get('/menuU', (req, res) => {
    res.render('menuU'); 
});

router.get('/menuA', (req, res) => {
    res.render('menuA'); 
});




//////////////////////////////////////////////////
router.post('/add', async (req, res) => {
    const { name, password, email } = req.body;
    const newUser = new usersSchema({ name, password, email });
    await newUser.save();
    res.redirect('/');
})

router.post('/delete', async (req, res) => {
    await usersSchema.findByIdAndDelete(req.body.id);
    res.redirect('/');
});


module.exports = router
