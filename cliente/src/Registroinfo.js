import axios from 'axios';
import { checkAnswers } from "./componentes/parseUserRespToBDFormat";
import insertIntoTable from "./json/insertIntoTable.json";

class Registroinfo {

  /**
   * Inserta en la BD la información pertinente a 'respuestas' y 'presupuestos'.
   * @param {int} idUsuario Id del usuario que llena la encuesta. 
   */
  static async insertRespuestasAndPresupuestos(idUsuario, userPos) {
    for (let i = 0; i < userPos; i++) {
      let table = insertIntoTable.toInsert[i].table;
      let info = insertIntoTable.toInsert[i].info;

      if (table === "respuestas") {
        const insertRespuesta = await axios.post('basedatos/insertRespuesta', {
          "usuarioID": idUsuario, "idEvento": info[0], "score": info[1]
        });
      } else if (table === "presupuestos") {
        const insertPresupuesto = await axios.post('basedatos/insertPresupuesto', {
          "idUsuario": idUsuario, "idEvento": info[0], "presupuesto": parseInt(info[1])
        });
      }
    }
  }

  /**
   * Se obtienenlas respuestas del usuario, se ingresa al usuario en la BD y se obtiene su id, y se procede a hacer las inserciones en las tablas de 'respuestas' y de 'presupuesto'.
   * @param {JSON} answers respuestas a la survey por parte del usuario.
   */
  static getAnswersAndUploadThem(answers) {
    const doAll = async () => {
      checkAnswers(answers);

      const userPos = insertIntoTable.toInsert.length - 1;
      const idUsuario = insertIntoTable.toInsert[userPos].info[0];

      const usuarioExists = await (await axios.post('basedatos/checkusuarioExistence', { "idUsuario": idUsuario })).data;

      if (!usuarioExists) {
        const genero = (await axios.post('basedatos/getIdGenero', { "genero": insertIntoTable.toInsert[userPos].info[1] })).data.idGenero;
        const edad = parseInt(insertIntoTable.toInsert[userPos].info[2]);
        const gastoSemanal = parseInt(insertIntoTable.toInsert[userPos].info[3]);
        const conQuienSale = (await axios.post('basedatos/getIdConQuienSale', { "conQuienSale": insertIntoTable.toInsert[userPos].info[4] })).data.idconQuienSale;
        const ocupacion = (await axios.post('basedatos/getIdOcupacion', { "ocupacion": insertIntoTable.toInsert[userPos].info[5] })).data.idOcupacion;
        const estudio = (await axios.post('basedatos/getIdEstudio', { "estudio": insertIntoTable.toInsert[userPos].info[6] })).data.idEstudio;

        const insertUsuario = await axios.post('basedatos/insertUsuario', {
          "idUsuario": idUsuario, "genero": genero, "edad": edad, "gastoSemanal": gastoSemanal, "conQuienSale": conQuienSale, "ocupacion": ocupacion, "estudio": estudio
        });

        this.insertRespuestasAndPresupuestos(idUsuario, userPos);
      } else console.log("Usted ya hizo una encuesta");
    }

    doAll();
  }

  /**
   * Obtiene los puntajes obtenidos en total para cada tipo de evento registrado en la BD.
   */
  static getScoresByEvent() {
    const getScoresByEvent = async () => {
      const res = await axios.post('/basedatos/getScoresByEvent', {});
      console.log(res.data[0])
      console.log(res.data.length)
    }
  }
}

export { Registroinfo };