
//Instalar Express
const express = require('express');

const {programacion} = require('../datos/cursos.js').infoCursos;

const routerProgramacion = express.Router();
// Procesar el cuerpo de la solicitud.

routerProgramacion.use(express.json());

// Filtro para buscar cursos de lenguajes en especifico
routerProgramacion.get('/', (req, res) => {
    res.json(programacion);
  });

  routerProgramacion.get('/:lenguaje', (req, res) => {
  const lenguaje = req.params.lenguaje;
  const resultados = programacion.filter(curso => curso.lenguaje === lenguaje);

  if (resultados.length === 0)
  {
    return res.status(404).send(`NO SE ENCONTRARON CURSOS DE PROGRAMACION DEL LENGUAJE ${lenguaje}`);

  }
  res.send(JSON.stringify(resultados));

  });
  // Filtro para buscar niveles de cursos
  routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
  const lenguaje = req.params.lenguaje;
  const nivel = req.params.nivel;

  const resultados = programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel);

  if (resultados.length === 0)
{
  return res.status(404).send(`De momento no tenemos disponibles cursos de ${lenguaje} de nivel ${nivel}`);
}
res.send(JSON.stringify(resultados));

  });

  //pushh
  routerProgramacion.post('/', (req, res) => {
    let cursoNuevo = req.body;
    programacion.push(cursoNuevo);
    res.json(programacion);
  });

  //PUT, ACTUALIZAR
  routerProgramacion.put('/:id', (req, res) => {
    const cursoActualizado = req.body;
    const id = req.params.id;
  
    const indice = programacion.findIndex(curso => curso.id == id);
  
    if (indice >= 0) {
      programacion[indice] = cursoActualizado;
    }
    res.json(programacion);
  });
  
  // PATCH NO CAMBIA TODO
  routerProgramacion.patch('/:id', (req, res) => {
    const infoNueva = req.body;
    const id = req.params.id;
  
    const indice = programacion.findIndex(curso => curso.id == id);
  
    if (indice >= 0) {
      const cursoAModificar = programacion[indice];
      Object.assign(cursoAModificar, infoNueva);
    }
    res.json(programacion);
  });

  // DELETE

  routerProgramacion.delete('/:id', (req, res) => {
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);
  
    if (indice >= 0) {
      programacion.splice(indice, 1);
    }
    res.json(programacion);
  });
  //Exportar modulo
  module.exports = routerProgramacion;
