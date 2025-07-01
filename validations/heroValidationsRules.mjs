import { body } from 'express-validator';

export const superHeroesValidation = () => 
    [
        //Validacion Nombre del Superheroe
        body('nombreSuperheroe')
            .trim()
            .escape()
            .notEmpty()
            .withMessage('El Nombre del superheroe es requerido.')
            .isLength({ min: 3, max: 60 })
            .withMessage('El Nombre del superheroe debe tener entre 3 y 60 caracteres.'),
        
        //Validacion Nombre Real
        body('nombreReal')
            .trim()
            .escape()
            .notEmpty()
            .withMessage('El Nombre Real del superheroe es requerido.')
            .isLength({ min: 3, max: 60 })
            .withMessage('El Nombre Real del superheroe debe tener entre 3 y 60 caracteres.'),
        
        //Validacion edad
        body('edad')
            .trim() 
            .escape()
            .notEmpty()
            .withMessage('La Edad del superheroe es requerida.')
            .isNumeric()
            .withMessage('La Edad debe ser un número')
            .isInt({ min: 0 })
            .withMessage('La Edad no puede ser negativa'),
        
        //Validacion poderes
        body('poderes')
            .isArray({ min: 1 })
            .withMessage('Los Poderes del superhéroe deben tener al menos un elemento.'),
        
        body('poderes.*')
            .trim()
            .escape()
            .isLength({ min: 3, max: 60})
            .withMessage('Cada Poder del superheroe debe tener entre 3 y 60 caracteres.'),            
        
        //Validacion Aliados
        body('aliados')
            .isArray({ min: 1 })
            .withMessage('Aliados debe tener al menos un elemento.'),
        
        body('aliados.*')
            .trim()
            .escape()
            .isLength({ min: 3, max: 60})
            .withMessage('Cada Aliado debe tener entre 3 y 60 caracteres.'),            
        
        //Validacion Enemigos
        body('enemigos')
            .isArray({ min: 1 })
            .withMessage('Enemigos debe tener al menos un elemento.'),
        
        body('enemigos.*')
            .trim()
            .escape()
            .isLength({ min: 3, max: 60})
            .withMessage('Cada Enemigo debe tener entre 3 y 60 caracteres.'),            

    ]