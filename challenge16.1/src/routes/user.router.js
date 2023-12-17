import express from 'express';
import multer from 'multer';
import { uploadDocument, uploadProfilePhoto, uploadProductImage } from '../controllers/users.controller.js';

const router = express.Router();

// Configuración de Multer con almacenamiento personalizado
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let destinationFolder = './uploads/documents/';
        if (file.fieldname === 'profilePhoto') {
            destinationFolder = './uploads/profiles/';
        } else if (file.fieldname === 'productImage') {
            destinationFolder = './uploads/products/';
        }
        cb(null, destinationFolder);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
    },
});

const upload = multer({ storage: storage });


router.post('/:uid/documents', upload.array('documents'), uploadDocument);
router.post('/:uid/profilePhoto', upload.single('profilePhoto'), uploadProfilePhoto);
router.post('/:uid/productImage', upload.single('productImage'), uploadProductImage);

export default router;
