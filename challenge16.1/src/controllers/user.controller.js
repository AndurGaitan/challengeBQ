export const uploadDocument = (req, res) => {
    try {

        const user = getUserById(req.params.uid);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const uploadedDocuments = req.files.map(file => ({
            name: file.originalname,
            reference: `/uploads/documents/${file.filename}`, // Puedes almacenar la referencia al archivo
        }));

        user.documents = uploadedDocuments;
        saveUser(user);

        res.status(200).json({ message: 'Documentos subidos con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al procesar la subida de documentos' });
    }
};

export const uploadProfilePhoto = (req, res) => {
    try {
        const user = getUserById(req.params.uid);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        const profilePhoto = {
            name: req.file.originalname,
            reference: `/uploads/profiles/${req.file.filename}`, // Puedes almacenar la referencia al archivo
        };
        user.profilePhoto = profilePhoto;
        saveUser(user);

        res.status(200).json({ message: 'Foto de perfil subida con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al procesar la subida de la foto de perfil' });
    }
};

export const uploadProductImage = (req, res) => {
    try {

        const product = getProductById(req.params.pid);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const productImage = {
            name: req.file.originalname,
            reference: `/uploads/products/${req.file.filename}`, // Puedes almacenar la referencia al archivo
        };

        product.productImage = productImage;
        saveProduct(product);

        res.status(200).json({ message: 'Imagen del producto subida con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al procesar la subida de la imagen del producto' });
    }
};

export const getAllUsers = async(req, res) => {
    try{
        const allUsers = await usersService.get();
        res.status(200).json(allUsers)
    } catch(error){
        res.status(500).json({error: error.nessage})
    }

}
