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
  const { usuarioID, idEvento, score } = req.body;
  await client.query(
    `insert into respuestas(id_usuario, id_evento, puntaje) values(${usuarioID}, ${idEvento}, ${score});`
  )
  res.send("All Good");
})

/**
 * Inserta un nuevo usuario en la base de datos.
 */
router.post('/insertUsuario', async (req, res) => {
  const { idUsuario, genero, edad, gastoSemanal, conQuienSale, ocupacion, estudio } = req.body;
  const insert = await client.query(
    `insert into usuarios values('${idUsuario}', ${genero}, ${estudio}, ${ocupacion}, ${conQuienSale}, ${edad}, ${gastoSemanal});`
  );
  res.send("All Good");
});

/**
 * Inserta un nuevo presupuesto en la tabla de 'presupuestos' para un usuario.
 */
router.post('/insertPresupuesto', async (req, res) => {
  const { idUsuario, idEvento, presupuesto } = req.body;
  const nothing = await client.query(
    `insert into presupuestos values(${idUsuario}, ${idEvento}, ${presupuesto});`
  );
  res.send("All Good");
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

router.post('/checkusuarioExistence', async (req, res) => {
  const { idUsuario } = req.body;
  const exists = await client.query(
    `select * from usuarios where id_usuario='${idUsuario}';`
  )

  res.send(exists.rowCount === 0 ? false : true);
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