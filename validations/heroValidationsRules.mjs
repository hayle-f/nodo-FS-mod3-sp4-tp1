import { body } from 'express-validator';

export const superHeroesValidation = () => 
    [
        body('nombreSuperheroe')
            .trim()
            .escape()
            .notEmpty()
            .withMessage('El nombre del superheroe es requerido.')
            .isLength({ min: 3, max: 60 })
            .withMessage('El Nombre del superheroe debe tener entre 3 y 60 caracteres.'),
        
        body('nombreReal')
            .trim()
            .escape()
            .notEmpty()
            .withMessage('El nombre real del superheroe es requerido.')
            .isLength({ min: 3, max: 60 })
            .withMessage('El Nombre Real del superheroe debe tener entre 3 y 60 caracteres.'),
        
        body('edad')
            .trim() 
            .escape()
            .notEmpty()
            .withMessage('La edad del superheroe es requerida.')
            .isNumeric()
            .withMessage('La edad debe ser un número')
            .isInt({ min: 0 })
            .withMessage('La edad no puede ser negativa'),
        
        body('poderes')
            .isArray({ min: 1 })
            .withMessage('Los poderes del superhéroe deben tener al menos un elemento.'),
        
        body('poderes.*')
            .trim()
            .escape()
            .isLength({ min: 3, max: 60})
            .withMessage('El poder del superheroe debe tener entre 3 y 60 caracteres.'),            

    ]