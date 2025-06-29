function transformarStringAArray(campo) {
  if (typeof campo === 'string' && campo.length > 0) {
    return campo
      .split(',')
      .map(p => p.trim())
      .filter(p => p.length > 0);
  }
  return campo;
}

export function transformarDatosSuperheroe(req, res, next) {
  const datos = req.body;

  datos.poderes = transformarStringAArray(datos.poderes);
  datos.aliados = transformarStringAArray(datos.aliados);
  datos.enemigos = transformarStringAArray(datos.enemigos);

  next();
}