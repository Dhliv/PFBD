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
 * Supuestamente inserta en la tabla respuesta los valores de usuarioID y el idRespuesta.
 */
router.post('/insertRespuesta', async (req, res) => {
  const { usuarioID, idRespuesta } = req.body;
  await client.query(
    `insert into respuesta values('${usuarioID}', '${idRespuesta}');`
  )

  res.send(console.log("xd"));
})

/**
 * Obtiene el IdRespuesta siguiente.
 */
router.post('/getNewIdRespuesta', async (req, res) => {
  const idRespuesta = client.query(
    `select nextval('idRespuesta');`
  );
  res.send({ "idRespuesta": idRespuesta.rows[0].nextval });
});

/**
 * Obtiene el IdUsuario siguiente.
 */
router.post('/getNewIdUsuario', async (req, res) => {
  const idUsuario = await client.query(
    `select nextval('idUsuario');`
  );
  res.send({ "idUsuario": idUsuario.rows[0].nextval });
});

/**
 * Inserta una respuesta a la tabla resultado_pregunta.
 */
router.post('/insertResultadoPreguntas', async (req, res) => {
  const { idRespuesta, idEvento, score } = req.body;
  await client.query(
    `insert into resultado_preguntas values('${idRespuesta}', '${idEvento}', '${score}');`
  );
  res.send(console.log("xd"));
});

/**
 * Inserta un nuevo usuario en la base de datos.
 */
router.post('/insertUsuario', async (req, res) => {
  const { idUsuario, genero, edad, id_ocupacion, id_estudio } = req.body;
  await client.query(
    `insert into usuario(id_usuario, genero, edad, id_ocupacion, id_estudio) values('${idUsuario}', '${genero}', '${edad}', '${id_ocupacion}', '${id_estudio}');`
  );
  res.send("all ok");
});

/**
 * Obtiene el puntaje total obtenido por evento.
 */
router.post('/getScoresByEvent', async (req, res) => {
  const eventsAndScores = await client.query(
    `select RP.id_evento, sum(RP.puntaje) from respuesta as R inner join resultado_preguntas as RP on RP.id_respuesta = R.id_respuesta group by RP.id_evento;`
  )

  res.send(eventsAndScores.rows);
});