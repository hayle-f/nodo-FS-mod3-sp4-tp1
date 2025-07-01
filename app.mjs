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

// Conectar a MongoDB
connectDB();

// Middleware para parsear formularios urlencoded y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware para soportar PUT y DELETE vía formularios con ?_method=PUT o DELETE
app.use(methodOverride('_method'));

// Middleware para variables locales por defecto en las vistas
app.use((req, res, next) => {
  res.locals.errores = [];
  res.locals.superheroe = {};
  next();
});

// Configuración del motor de vistas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ruta raíz que redirige a /api/heroes 
app.get('/', (req, res) => {
  res.redirect('/api/heroes');
});

// Rutas de la API
app.use('/api', superHeroRoutes);

// Manejo de errores para rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).send({ mensaje: "Rutas no encontrada" });
});
/* app.use((req, res) => {
  res.status(404).render('404', { mensaje: "Ruta no encontrada" });
}); */

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en: http://localhost:${PORT}/api/heroes`);
});
