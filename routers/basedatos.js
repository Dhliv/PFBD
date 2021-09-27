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
 * Inserta una respuesta del usuario en la BD.
 */
router.post('/insertRespuesta', async (req, res) => {
  const { usuarioID, idRespuesta, idEvento, score } = req.body;
  await client.query(
    `insert into respuesta values('${usuarioID}', '${idRespuesta}', '${idEvento}', '${score}');`
  )
  res.send(console.log("xd"));
})

/**
 * Inserta un nuevo usuario en la base de datosy retorn su id.
 */
router.post('/insertUsuario', async (req, res) => {
  const { genero, edad, gastoSemanal, conQuienSale, ocupacion, estudio } = req.body;
  const idUsuario = await client.query(
    `insert into usuario(id_genero, id_estudio, id_ocupacion, id_con_quien_sale, edad, gasto_semanal_ocio) values(${genero}, ${estudio}, ${ocupacion}, ${conQuienSale}, ${edad}, ${gastoSemanal}) returning id_usuario;`
  );
  res.send({ "idUsuario": idUsuario.rows[0].nextval });
});

/**
 * Obtiene de la tabla estudio el ID del estudio deseado (viene en un string).
 */
router.post('/getIdEstudio', async (req, res) => {
  const { estudio } = req.body;
  const idEstudio = await client.query(
    `select id_estudio from estudios where nombre_estudio='${estudio}';`
  );
  res.send({ "idEstudio": idEstudio.rows[0].id_estudio });
});

/**
 * Obtiene de la tabla generos el ID del genero deseado (viene en un string).
 */
router.post('/getIdGenero', async (req, res) => {
  const { genero } = req.body;
  const idGenero = await client.query(
    `select id_genero from generos where genero='${genero}';`
  );
  res.send({ "idGenero": idGenero.rows[0].id_genero });
});

/**
 * Obtiene de la tabla ocupaciones el ID de la ocupación deseada (viene en un string).
 */
router.post('/getIdOcupacion', async (req, res) => {
  const { ocupacion } = req.body;
  const idOcupacion = await client.query(
    `select id_ocupacion from ocupaciones where nombre_ocupacion='${ocupacion}';`
  );
  res.send({ "idOcupacion": idOcupacion.rows[0].id_ocupacion });
});

/**
 * Obtiene de la tabla con_quien_sale_habitualmente el ID de con quien sale habitualmente deseada (viene en un string).
 */
router.post('/getIdConQuienSale', async (req, res) => {
  const { conQuienSale } = req.body;
  const idconQuienSale = await client.query(
    `select id_con_quien_sale from con_quien_sale_habitualmente where persona_con_quien_sale='${conQuienSale}';`
  );
  res.send({ "idconQuienSale": idconQuienSale.rows[0].id_con_quien_sale });
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