const express = require('express');
const router = express.Router();
const Noticia = require('../models/noticia'); // Importar el modelo
const upload = require('../upload'); // Middleware para manejar imágenes con Multer

// Ruta para mostrar el formulario de nueva noticia
router.get('/add', (req, res) => {
    res.render('addNoticia', { title: 'Añadir Noticia' });
});

// Ruta para crear una nueva noticia
router.post('/', upload.single('imagen'), async (req, res) => {
    try {
        const { titulo, contenido, autor } = req.body;
        const nuevaNoticia = new Noticia({
            titulo,
            contenido,
            autor,
            imagen: req.file ? `/img/${req.file.filename}` : null, // Guarda la ruta de la imagen
        });
        await nuevaNoticia.save();
        res.redirect('/noticias'); // Redirige al listado de noticias
    } catch (error) {
        console.error('Error al crear la noticia:', error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para listar todas las noticias
router.get('/', async (req, res) => {
    try {
        const noticias = await Noticia.find().sort({ fechaPublicacion: -1 });
        res.render('noticias', { title: 'Lista de Noticias', noticias });
    } catch (error) {
        console.error('Error al obtener las noticias:', error);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;
