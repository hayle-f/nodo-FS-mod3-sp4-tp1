import { obtenerSuperHeroePorId, obtenerTodosLosSuperHeroes, buscarSuperHeroePorAtributo, obtenerSuperHeroesMayoresA40, crearNuevoSuperHero, modificarSuperHero, eliminarSuperHeroPorID, eliminarSuperHeroPorNombre } from '../services/superHeroService.mjs';

import { renderizarSuperheroe, renderizarListaSuperheroes} from '../views/responseView.mjs';


//Obtener superheroe por ID
export async function obtenerSuperHeroePorIdController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await obtenerSuperHeroePorId(id);
        if(!superheroe) {
            return res.status(404).send({mensaje: 'Superheroe no encontrado.' });
        }

        res.render('detalleSuperheroe', { superheroe });
        /* const superHeroeFormateado = renderizarSuperheroe(superheroe);
        res.status(200).json(superHeroeFormateado); */
    } catch(error) {
        res.status(500).send({ mensaje: 'Error al obtener el superheroe.', error: error.message });
    }
    
}

// obtener todos los superheroes
export async function obtenerTodosLosSuperHeroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperHeroes();

        const { exito = null } = req.query;  

        res.render('dashboardListaSuperheroes', { 
            superheroes, 
            exito
        });
       
    } catch(error) {
         res.status(500).send({ mensaje: 'Error al obtener los superheroes.', error: error.message });
    }
    
}

// Buscar superheroe por atributo:valor
export async function buscarSuperHeroePorAtributoController(req, res) {
    try {
        const { atributo, valor } = req.params;
        const superheroes = await buscarSuperHeroePorAtributo(atributo, valor);

        if(superheroes.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron superheroes con ese atributo'});
        }

        const superHeroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superHeroesFormateados);

    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar los superheroes', error: error.message });
    }
    
}

// obtener superheroes mayores a 100
export async function obtenerSuperHeroesMayoresA40Controller(req, res) {
    try {
        const superheroes = await obtenerSuperHeroesMayoresA40();
        if(superheroes.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron superheroes mayores a 30 años' });
        }

        const superHeroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superHeroesFormateados);
        
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener superheroes mayores a 30', error: error.message });
    }
    
}

//Mostrar vista crear
export async function mostrarFormularioCrearSuperHeroe(req, res) {
    try {     
        res.render('addSuperhero');        
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al mostrar el formulario de creación', error: error.message });
    }    
} 

// Crear nuevo superheroe
export async function crearNuevoSuperHeroController(req, res) {
    try {
        const heroDatos = req.body;       

        const nuevoSuperheroe = await crearNuevoSuperHero(heroDatos);

        res.redirect('/api/heroes?exito=creado');
                
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al crear el nuevo superheroe', error: error.message });
    }
    
}

//Mostrar vista editar
export async function mostrarFormularioEditarSuperHeroe(req, res) {
    try {
        const { id } = req.params;

        const superheroe = await obtenerSuperHeroePorId(id);

        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado para editar' });
        }

        res.render('editSuperhero', { superheroe });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al mostrar el formulario de edición', error: error.message });
    }
}

// Modificar superheroe
export async function modificarSuperHeroController(req, res) {
    try {
        const { id } = req.params;
        const datos = req.body;

        const superHeroeModificado = await modificarSuperHero(id, datos);
        
        res.redirect('/api/heroes?exito=editado');

    } catch (error) {
        res.status(500).send({ mensaje: 'Error al modificar el superheroe', error: error.message });
    }
    
}

// Eliminar superheroe por ID

export async function mostrarFormEliminarController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await obtenerSuperHeroePorId(id);

        if(!superheroe) {
            return res.status(404).send({mensaje: 'Superheroe no encontrado.' });
        }

        res.render('confirmarEliminacion', { superheroe });
    } catch(error) {
        res.status(500).send({ mensaje: 'Error al mostrar el superheroe.', error: error.message });
    }
}


export async function eliminarSuperHeroPorIDController(req, res) {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).send({ mensaje: 'ID no proporcionado' });
        }

        const deletedSuperHeroe = await eliminarSuperHeroPorID(id);

        if (!deletedSuperHeroe) {
            return res.status(404).send({ mensaje: 'No se encontró un superhéroe con ese ID' });
        }

        res.redirect('/api/heroes?exito=eliminado');
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar el superheroe', error: error.message });
    }
    
}

// Eliminar superheroe por Nombre
export async function eliminarSuperHeroPorNombreController(req, res) {
    try {
        const { nombreSuperheroe } = req.params;
        
        if(!nombreSuperheroe) {
            return res.status(400).send({ mensaje: 'Nombre del superheroe no proporcionado' });
        }

        const deletedSuperHeroe = await eliminarSuperHeroPorNombre(nombreSuperheroe);

        if (!deletedSuperHeroe) {
            return res.status(404).send({ mensaje: 'No se encontró un superhéroe con ese nombre' });
        }

        const deletedSuperHeroeFormateado = renderizarSuperheroe(deletedSuperHeroe);
        res.status(200).json(deletedSuperHeroeFormateado);
        
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar el superheroe', error: error.message });
    }
    
}




