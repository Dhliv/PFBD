const { Client } = require('pg');
const Router = require('express-promise-router');
var keys = require('../confi/keys')


const client = new Client({
  connectionString: keys.postgresurl,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

router.post('/consultarestudiante', async (req, res) => {
  const {codigo}  = req.body;
  const est = await client.query(
    `SELECT nombre, carrera, semestre FROM estudiantes WHERE codigo = '${codigo}'`
    );
  if(est.rowCount == 0) res.send({"est":0})
  else{
    aux = est.rows[0]
    res.send({"est":1, "nombre":aux.nombre,"carrera":aux.carrera,"semestre":aux.semestre});
    }
});

router.post('/insertarestudiante', async (req, res) => {
  const {codigo, nombre, carrera, semestre} = req.body;
  await client.query(
    `INSERT INTO estudiantes(nombre, codigo, carrera, semestre) VALUES('${nombre}','${codigo}','${carrera}', '${semestre}')`
  );
  res.send('INSERTADO');
});

router.post('/updateestudiante', async (req, res) => {
  const {codigo, nombre, carrera, semestre} = req.body;
  await client.query(
    `update estudiantes set nombre = '${nombre}', carrera = '${carrera}', semestre = '${semestre}' where codigo = '${codigo}';`
  );
  res.send('ACTUALIZADO');
});

router.post('/deleteestudiante', async (req, res) => {
  const {codigo} = req.body;
  await client.query(
    `delete from estudiantes where codigo = '${codigo}';`
  );
  res.send('ELIMINADO');
});