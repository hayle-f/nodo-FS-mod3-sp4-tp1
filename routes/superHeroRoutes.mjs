import express from 'express';
import { obtenerSuperHeroePorIdController, obtenerTodosLosSuperHeroesController, buscarSuperHeroePorAtributoController, obtenerSuperHeroesMayoresA100Controller, crearNuevoSuperHeroController, modificarSuperHeroController, eliminarSuperHeroPorIDController, eliminarSuperHeroPorNombreController  } from '../controllers/superheroesController.mjs';
import { superHeroesValidation } from '../validations/heroValidationsRules.mjs';
import { handleValidationErrors } from '../validations/heroError.middleware.mjs';

const router = express.Router();

router.get('/heroes/mayores-100', obtenerSuperHeroesMayoresA100Controller);
router.get('/heroes/atributo/:atributo/:valor', buscarSuperHeroePorAtributoController);
router.get('/heroes/:id', obtenerSuperHeroePorIdController);
router.get('/heroes', obtenerTodosLosSuperHeroesController);

router.post('/heroes', superHeroesValidation(), handleValidationErrors,  crearNuevoSuperHeroController);

router.put('/heroes/:id', modificarSuperHeroController);

router.delete('/heroes/:id', eliminarSuperHeroPorIDController);
router.delete('/heroes/nombreSuperheroe/:nombreSuperheroe', eliminarSuperHeroPorNombreController);



export default router;

