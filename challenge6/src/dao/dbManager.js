import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://user:hq2jjtt7lPyRE41e@clusterurl/dbname';

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
