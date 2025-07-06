import { obtenerSuperHeroePorId } from '../services/superHeroService.mjs';

function transformarStringAArray(campo) {
  if (typeof campo === 'string' && campo.length > 0) {
    return campo
      .split(',')
      .map(p => p.trim())
      .filter(p => p.length > 0);
  }
  return campo;
}

export async function transformarDatosSuperheroe(req, res, next) {
  try {
    let datos = req.body;

    // Si es un PUT desde Postman/API (no desde formulario)
    if (req.method === 'PUT' && req.headers.accept?.includes('application/json')) {
      const { id } = req.params;
      const original = await obtenerSuperHeroePorId(id);

      if (!original) {
        return res.status(404).json({ mensaje: 'Superhéroe no encontrado para completar datos' });
      }

      datos = { ...original.toObject(), ...datos };
      req.body = datos;
    }

    // Siempre transformar string a array
    req.body.poderes = transformarStringAArray(datos.poderes);
    req.body.aliados = transformarStringAArray(datos.aliados);
    req.body.enemigos = transformarStringAArray(datos.enemigos);

    next();
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al procesar los datos del superhéroe', error: error.message });
  }
}
