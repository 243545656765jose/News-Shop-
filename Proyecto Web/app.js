const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const routerLogout = require('./routes/logout');
const routerRegistro = require('./routes/registro'); // Importar rutas de registro
const routerLogin = require('./routes/login'); // Importar rutas de login
const routerNoticias = require('./routes/noticias'); // Importar rutas de noticias
const mongoose = require('./conexion'); // Conexión a MongoDB


const app = express();



app.use(session({
    secret: 'mi_secreto_seguro', // Cambia esto por un secreto más seguro
    resave: false,
    saveUninitialized: true,
}));

// Registrar rutas
app.use('/logout', routerLogout); // Registrar la ruta de logout


// Configuración de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use(routerRegistro); // Rutas de registro
app.use(routerLogin); // Rutas de login
app.use('/noticias', routerNoticias); // Rutas de noticias

// Página principal
app.get('/', (req, res) => {
    res.render('login', { title: 'Inicio' });
});

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).render('404', { title: 'Página no encontrada' });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
