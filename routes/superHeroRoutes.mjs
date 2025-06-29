import express from 'express';
import { obtenerSuperHeroePorIdController, obtenerTodosLosSuperHeroesController, buscarSuperHeroePorAtributoController, obtenerSuperHeroesMayoresA100Controller, crearNuevoSuperHeroController, modificarSuperHeroController, eliminarSuperHeroPorIDController, eliminarSuperHeroPorNombreController, mostrarFormularioCrearSuperHeroe, mostrarFormularioEditarSuperHeroe, mostrarFormEliminarController } from '../controllers/superheroesController.mjs';
import { superHeroesValidation } from '../validations/heroValidationsRules.mjs';
import { handleValidationErrors } from '../validations/heroError.middleware.mjs';
import { transformarDatosSuperheroe } from '../validations/transformarDatosSuperheroe.mjs';

const router = express.Router();

//Mostrar formulario crear
router.get('/heroes/crear', mostrarFormularioCrearSuperHeroe);

router.get('/heroes/mayores-100', obtenerSuperHeroesMayoresA100Controller);
router.get('/heroes/atributo/:atributo/:valor', buscarSuperHeroePorAtributoController);
router.get('/heroes/:id', obtenerSuperHeroePorIdController);
router.get('/heroes', obtenerTodosLosSuperHeroesController);



//Crear
router.post('/heroes', transformarDatosSuperheroe, superHeroesValidation(), handleValidationErrors,  crearNuevoSuperHeroController);


//Modificar
router.get('/heroes/editar/:id', mostrarFormularioEditarSuperHeroe);

router.put('/heroes/:id',transformarDatosSuperheroe, superHeroesValidation(), handleValidationErrors, modificarSuperHeroController);


//Eliminar
router.delete('/heroes/:id', eliminarSuperHeroPorIDController);
router.get('/heroes/:id/confirmar-eliminacion', mostrarFormEliminarController);
router.delete('/heroes/nombreSuperheroe/:nombreSuperheroe', eliminarSuperHeroPorNombreController);



export default router;

/* Trepar paredes,Sentido arácnido,Super fuerza */