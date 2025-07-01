import { body } from 'express-validator';

export const superHeroesValidation = () => 
    [
        //Validacion Nombre del Superheroe
        body('nombreSuperheroe')
            .trim()
            .escape()
            .notEmpty()
            .withMessage('El nombre del superheroe es requerido.')
            .isLength({ min: 3, max: 60 })
            .withMessage('El Nombre del superheroe debe tener entre 3 y 60 caracteres.'),
        
        //Validacion Nombre Real
        body('nombreReal')
            .trim()
            .escape()
            .notEmpty()
            .withMessage('El nombre real del superheroe es requerido.')
            .isLength({ min: 3, max: 60 })
            .withMessage('El Nombre Real del superheroe debe tener entre 3 y 60 caracteres.'),
        
        //Validacion edad
        body('edad')
            .trim() 
            .escape()
            .notEmpty()
            .withMessage('La edad del superheroe es requerida.')
            .isNumeric()
            .withMessage('La edad debe ser un número')
            .isInt({ min: 0 })
            .withMessage('La edad no puede ser negativa'),
        
        //Validacion poderes
        body('poderes')
            .isArray({ min: 1 })
            .withMessage('Los poderes del superhéroe deben tener al menos un elemento.'),
        
        body('poderes.*')
            .trim()
            .escape()
            .isLength({ min: 3, max: 60})
            .withMessage('Cada poder del superheroe debe tener entre 3 y 60 caracteres.'),            
        
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
            .withMessage('Cada enemigo debe tener entre 3 y 60 caracteres.'),            

    ]