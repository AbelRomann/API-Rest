//Instalando express

const express = require('express');
const app = express();
const cursoRouter = require('./routes/cursos.routes.js')

require('./db/dbconnection')

//Importando y exportando
const {infoCursos} = require('./datos/cursos.js');

// Routers para evitar repetir codigo
const routerProgramacion = require('./routers/programacion.js');
app.use('/api/cursos/programacion', routerProgramacion);

const routerMatematicas = require('./routers/matematicas.js');
const Cursos = require('./models/cursoss.js');
app.use('/api/cursos/matematicas', routerMatematicas);

// procesar las solicitudes que llegan en formato JSON.

app.use(express.json())
app.use(cursoRouter)
// Routing inicializando servidor

app.get('/', (req, res) => {
    res.send('Mi primer servidor con Express klk. Cursos 💻.');        
  });
  
  app.get('/api/cursos', (req, res) => {
    res.send(JSON.stringify(infoCursos));
  });
  const port = 3000
  //Puerto
 
  
  app.listen(port, () => {
    console.log(`El servidor esta escuchando en el puerto ${port}...`);      
  });