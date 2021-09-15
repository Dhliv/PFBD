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


/**
 * 
 * 
 */

router.post('/recibirFormulario', async (req, res) => {

  const { datosPersonales, respuestas } = req.body;

  await insertarDatosPersonales(datosPersonales);
  await insertarRespuestas(respuestas);

  console.log("Guardación exitosa");

})


function insertarDatosPersonales(datosPersonales) {
  client.query(``);
  client.query(``);
  client.query(``);
}

function insertarRespuestas(respuestas) {
  client.query(``);
  client.query(``);
  client.query(``);
}

/**
 * Supuestamente inserta en la tabla respuesta los valores de usuarioID y el idRespuesta.
 */
router.post('/insertRespuesta', async (req, res) => {
  const { usuarioID, idRespuesta } = req.body;
  await client.query(
    `insert into respuesta values('${usuarioID}', '${idRespuesta}');`
  )
})

/**
 * Obtiene el IdRespuesta siguiente.
 */
router.post('/getNewIdRespuesta', async (req, res) => {
  const idRespuesta = await client.query(
    `select nextval('idRespuesta');`
  );
  res.send({ "idRespuesta": idRespuesta.rows[0].nextval });
});

/**
 * Inserta una respuesta a la tabla resultado_pregunta.
 */
router.post('/insertResultadoPreguntas', async (req, res) => {
  const { idRespuesta, idEvento, score } = req.body;
  await client.query(
    `insert into resultado_preguntas values('${idRespuesta}', '${idEvento}', '${score}');`
  );
});

/**
 * Inserta un nuevo usuario en la base de datos y retorna el ID asigando a él.
 */
router.post('/insertUsuario', async (req, res) => {
  const { genero, edad, id_ocupacion, id_estudio } = req.body;
  await client.query(
    `insert into usuario(genero, edad, id_ocupacion, id_estudio) values('${genero}', '${edad}', '${id_ocupacion}', '${id_estudio}');`
  );
  const usuario = await client.query(
    `select id_usuario from usuario order by id_usuario desc limit 1;`
  )
  aux = usuario.rows[0];
  res.send({ "idUsuario": aux.id_usuario });
});

router.post('/getScoresByEvent', async (req, res) => {
  const eventsAndScores = await client.query(
    `select RP.id_evento, sum(RP.puntaje) from respuesta as R inner join resultado_preguntas as RP on RP.id_respuesta = R.id_respuesta group by RP.id_evento;`
  )
  var arrayEventsAndScores = [];

  for (const row in eventsAndScores.rows) {
    arrayEventsAndScores.push({ "idEvento": row.id_evento, "score": row.puntaje });
  }

  res.send(eventsAndScores);
});








//* Los que nadie quiere

// router.post('/consultarestudiante', async (req, res) => {
//   const { codigo } = req.body;
//   const est = await client.query(
//     `SELECT nombre, carrera, semestre FROM estudiantes WHERE codigo = '${codigo}'`
//   );
//   if (est.rowCount == 0) res.send({ "est": 0 })
//   else {
//     aux = est.rows[0]
//     res.send({ "est": 1, "nombre": aux.nombre, "carrera": aux.carrera, "semestre": aux.semestre });
//   }
// });

// router.post('/insertarestudiante', async (req, res) => {
//   const { codigo, nombre, carrera, semestre } = req.body;
//   await client.query(
//     `INSERT INTO estudiantes(nombre, codigo, carrera, semestre) VALUES('${nombre}','${codigo}','${carrera}', '${semestre}')`
//   );
//   res.send('INSERTADO');
// });

// router.post('/updateestudiante', async (req, res) => {
//   const { codigo, nombre, carrera, semestre } = req.body;
//   await client.query(
//     `update estudiantes set nombre = '${nombre}', carrera = '${carrera}', semestre = '${semestre}' where codigo = '${codigo}';`
//   );
//   res.send('ACTUALIZADO');
// });

// router.post('/deleteestudiante', async (req, res) => {
//   const { codigo } = req.body;
//   await client.query(
//     `delete from estudiantes where codigo = '${codigo}';`
//   );
//   res.send('ELIMINADO');
// });
