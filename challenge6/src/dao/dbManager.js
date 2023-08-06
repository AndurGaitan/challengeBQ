import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://adminEcommerce:2Whn48RR66OEm8gv@cluster0.jwe0tnc.mongodb.net/';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {dbName: 'clase09'})
        .then(()=> console.log('DBconected'))
        .then(() => app.listen(8080, () => console.log('Listening')))
    console.log('Conexión a la base de datos establecida');
  } catch (error) {
    console.error('Error de conexión a la base de datos:', error);
  }
};

export default connectDB;
