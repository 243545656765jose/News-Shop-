const multer = require('multer');
const path = require('path');

// Configuración del almacenamiento para Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Verifica que las imágenes se guarden en public/img
        cb(null, path.join(__dirname, 'public', 'img')); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Genera un nombre único
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedExtensions = /jpeg|jpg|png|gif/; // Tipos permitidos
        const extName = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
        const mimeType = allowedExtensions.test(file.mimetype);

        if (extName && mimeType) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, gif)'));
        }
    }
});

module.exports = upload;
