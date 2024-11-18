//instalar express
const express = require('express');

const {matematicas} = require('../datos/cursos.js').infoCursos;

const routerMatematicas = express.Router();

routerMatematicas.use(express.json());


routerMatematicas.get('/', (req, res) => {
    res.json(matematicas);
  });

  routerMatematicas.get('/:tema', (req, res) => {
    const tema = req.params.tema;
    const resultados = matematicas.filter(curso => curso.tema === tema);

    if (resultados.length === 0){
    return res.status(404).send(`NO HAY NINGUN CURSO DE ${tema}`);
    }

    res.send(JSON.stringify(resultados));

  });

// Filtrar cursos por nivel en matematicas
routerMatematicas.get('/:tema/:nivel', (req, res) => {
  const tema = req.params.tema;
  const nivel = req.params.nivel;

  const resultados = matematicas.filter(curso => curso.tema === tema && curso.nivel === nivel);

  if (resultados.length === 0)
{
  return res.status(404).send(`De momento no tenemos disponibles cursos de ${tema} de nivel ${nivel}`);
}
res.send(JSON.stringify(resultados)); 

});

//pushh
routerMatematicas.post('/', (req, res) => {
  let cursoNuevo = req.body;
  matematicas.push(cursoNuevo);
  res.json(matematicas);
});

  //PUT, ACTUALIZAR
  routerMatematicas.put('/:id', (req, res) => {
    const cursoActualizado = req.body;
    const id = req.params.id;
  
    const indice = matematicas.findIndex(curso => curso.id == id);
  
    if (indice >= 0) {
      matematicas[indice] = cursoActualizado;
    }
    res.json(matematicas);
  });

  // PATCH NO CAMBIA TODO
  routerMatematicas.patch('/:id', (req, res) => {
    const infoNueva = req.body;
    const id = req.params.id;
  
    const indice = matematicas.findIndex(curso => curso.id == id);
  
    if (indice >= 0) {
      const cursoAModificar = matematicas[indice];
      Object.assign(cursoAModificar, infoNueva);
    }
    res.json(matematicas);
  });

   // DELETE

   routerMatematicas.delete('/:id', (req, res) => {
    const id = req.params.id;
    const indice = matematicas.findIndex(curso => curso.id == id);
  
    if (indice >= 0) {
      matematicas.splice(indice, 1);
    }
    res.json(matematicas);
  });

module.exports = routerMatematicas;