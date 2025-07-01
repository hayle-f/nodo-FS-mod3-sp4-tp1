import express from 'express';
import { 
  obtenerSuperHeroePorIdController, 
  obtenerTodosLosSuperHeroesController, 
  buscarSuperHeroePorAtributoController, 
  obtenerSuperHeroesMayoresA100Controller, 
  crearNuevoSuperHeroController, 
  modificarSuperHeroController, 
  eliminarSuperHeroPorIDController, 
  eliminarSuperHeroPorNombreController, 
  mostrarFormularioCrearSuperHeroe, 
  mostrarFormularioEditarSuperHeroe, 
  mostrarFormEliminarController 
} from '../controllers/superheroesController.mjs';
import { superHeroesValidation } from '../validations/heroValidationsRules.mjs';
import { handleValidationErrors } from '../validations/heroError.middleware.mjs';
import { transformarDatosSuperheroe } from '../validations/transformarDatosSuperheroe.mjs';

const router = express.Router();

// Mostrar formulario para crear un nuevo superhéroe
router.get('/heroes/crear', mostrarFormularioCrearSuperHeroe);

// Obtener todos los superhéroes
router.get('/heroes', obtenerTodosLosSuperHeroesController);

// Obtener superhéroes con poder mayor a 100
router.get('/heroes/mayores-100', obtenerSuperHeroesMayoresA100Controller);

// Buscar superhéroe por atributo y valor
router.get('/heroes/atributo/:atributo/:valor', buscarSuperHeroePorAtributoController);

// Obtener superhéroe por ID
router.get('/heroes/:id', obtenerSuperHeroePorIdController);

// Crear nuevo superhéroe con validaciones y transformación previa
router.post('/heroes', transformarDatosSuperheroe, superHeroesValidation(), handleValidationErrors, crearNuevoSuperHeroController);

// Mostrar formulario para editar un superhéroe
router.get('/heroes/editar/:id', mostrarFormularioEditarSuperHeroe);

// Modificar superhéroe con validaciones y transformación previa
router.put('/heroes/editar/:id', transformarDatosSuperheroe, superHeroesValidation(), handleValidationErrors, modificarSuperHeroController);

// Eliminar superhéroe por ID
router.delete('/heroes/:id', eliminarSuperHeroPorIDController);

// Mostrar formulario de confirmación para eliminar superhéroe
router.get('/heroes/:id/confirmar-eliminacion', mostrarFormEliminarController);

// Eliminar superhéroe por nombre 
router.delete('/heroes/nombreSuperheroe/:nombreSuperheroe', eliminarSuperHeroPorNombreController);

export default router;
