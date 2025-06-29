import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';
import methodOverride from 'method-override';

// Configurar __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 3000;

// para parsear formularios
app.use(express.urlencoded({ extended: true })); 

// para parsear JSON (postman, api, etc)
app.use(express.json()); 

// para soportar PUT, DELETE vía formularios
app.use(methodOverride('_method')); 

//conexion con mongoDB
connectDB();

//Configuracion de motor de vistas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Configuracion de rutas 
app.use('/api', superHeroRoutes);

//Manejo de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).send({ mensaje: "Rutas no encontrada" });
});

//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}/api/heroes`);
});