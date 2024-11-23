const express = require('express');
const router = express.Router();

// Ruta para cerrar sesión
router.get('/', (req, res) => {
    if (req.session) {
        // Destruye la sesión activa
        req.session.destroy((err) => {
            if (err) {
                console.error('Error al destruir la sesión:', err);
                return res.status(500).send('Error al cerrar sesión');
            }

            // Limpia las cookies de la sesión
            res.clearCookie('connect.sid', { path: '/' });
            
            // Redirige al inicio de sesión o página principal
            res.redirect('/');
        });
    } else {
        // Si no hay sesión activa, redirige al inicio
        res.redirect('/');
    }
});

module.exports = router;
