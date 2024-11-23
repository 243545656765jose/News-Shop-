const express = require('express');
const router = express.Router();
const Noticia = require('../models/noticia'); // Importar el modelo
const upload = require('../upload'); // Middleware para manejar imágenes con Multer

// Ruta para listar noticias con búsqueda y filtro
router.get('/', async (req, res) => {
    try {
        const { search, categoria } = req.query; // Captura parámetros de búsqueda y categoría

        // Construye un filtro dinámico
        const filtro = {};
        if (search) {
            filtro.titulo = { $regex: search, $options: 'i' }; // Búsqueda insensible a mayúsculas
        }
        if (categoria) {
            filtro.categoria = categoria; // Filtra por categoría si se selecciona
        }

        // Busca noticias en la base de datos según el filtro
        const noticias = await Noticia.find(filtro).sort({ fechaPublicacion: -1 });

        // Renderiza la vista con los filtros aplicados
        res.render('noticias', { 
            title: 'Lista de Noticias', 
            noticias, 
            search: search || '', // Valor por defecto para búsqueda
            categoria: categoria || '' // Valor por defecto para categoría
        });
    } catch (error) {
        console.error('Error al obtener las noticias:', error);
        res.status(500).send('Error en el servidor al obtener las noticias');
    }
});

// Ruta para mostrar el formulario de nueva noticia
router.get('/add', (req, res) => {
    res.render('addNoticia', { title: 'Añadir Noticia' }); // Renderiza la vista del formulario
});

// Ruta para crear una nueva noticia
router.post('/add', upload.single('imagen'), async (req, res) => {
    try {
        const { titulo, contenido, autor, categoria } = req.body; // Incluye la categoría
        const nuevaNoticia = new Noticia({
            titulo,
            contenido,
            autor,
            categoria, // Asigna la categoría enviada por el formulario
            imagen: req.file ? `/img/${req.file.filename}` : null, // Guarda la ruta de la imagen si se sube
        });

        // Guarda la nueva noticia en la base de datos
        await nuevaNoticia.save();
        console.log('Noticia creada:', nuevaNoticia);
        res.redirect('/noticias/menuA'); // Redirige al listado de noticias
    } catch (error) {
        console.error('Error al crear la noticia:', error);
        res.status(500).send('Error en el servidor al crear la noticia');
    }
});



// Ruta para listar noticias en el menú de administración
router.get('/menuA', async (req, res) => {
    try {
        const noticias = await Noticia.find().sort({ fechaPublicacion: -1 });
        res.render('menuA', { title: 'Administrar Noticias', noticias });
    } catch (error) {
        console.error('Error al listar noticias:', error);
        res.status(500).send('Error al cargar las noticias.');
    }
});

// Ruta para mostrar el formulario de edición
router.get('/editar/:id', async (req, res) => {
    try {
        const noticia = await Noticia.findById(req.params.id);
        if (!noticia) {
            return res.status(404).send('La noticia no existe.');
        }
        res.render('editar', { title: 'Editar Noticia', noticia });
    } catch (error) {
        console.error('Error al cargar la noticia para editar:', error);
        res.status(500).send('Error al cargar la noticia.');
    }
});

// Ruta para guardar los cambios de edición
router.post('/editar/:id', upload.single('imagen'), async (req, res) => {
    try {
        const { titulo, contenido, autor, categoria } = req.body;
        const updateData = { titulo, contenido, autor, categoria };

        // Si se subió una nueva imagen, actualiza también su ruta
        if (req.file) {
            updateData.imagen = `/img/${req.file.filename}`;
        }

        // Actualiza la noticia en la base de datos
        await Noticia.findByIdAndUpdate(req.params.id, updateData);
        console.log('Noticia actualizada:', req.params.id);
        res.redirect('/noticias/menuA'); // Redirige al listado de noticias
    } catch (error) {
        console.error('Error al actualizar la noticia:', error);
        res.status(500).send('Error al actualizar la noticia.');
    }
});
router.post('/eliminar/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log('Intentando eliminar noticia con ID:', id);
        await Noticia.findByIdAndDelete(id);
        console.log('Noticia eliminada con éxito:', id);
        res.redirect('/noticias/menuA');
    } catch (error) {
        console.error('Error al eliminar la noticia:', error);
        res.status(500).send('Error al eliminar la noticia.');
    }
});


router.get('/:id', async (req, res) => {
    try {
        const noticia = await Noticia.findById(req.params.id); // Busca la noticia por su ID
        if (!noticia) {
            return res.status(404).send('La noticia no existe.');
        }

        res.render('detalleNoticia', { 
            title: `Detalles de la Noticia - ${noticia.titulo}`, 
            noticia 
        });
    } catch (error) {
        console.error('Error al cargar los detalles de la noticia:', error);
        res.status(500).send('Error en el servidor al cargar los detalles de la noticia.');
    }
});



module.exports = router;
