import axios from 'axios';
import { checkAnswers } from "./componentes/parseUserRespToBDFormat";
import insertIntoTable from "./json/insertIntoTable.json";

class Registroinfo {

  static getAnswersAndUploadThem(answers) {
    const doAll = async () => {
      checkAnswers(answers);
      console.log(insertIntoTable.toInsert);
      const userPos = insertIntoTable.toInsert.length - 1;
      const genero = (await axios.post('basedatos/getIdGenero', { "genero": insertIntoTable.toInsert[userPos].info[0] })).data.idGenero;
      const edad = insertIntoTable.toInsert[userPos].info[1];
      const gastoSemanal = insertIntoTable.toInsert[userPos].info[2];
      const conQuienSale = (await axios.post('basedatos/getIdConQuienSale', { "conQuienSale": insertIntoTable.toInsert[userPos].info[3] })).data.idconQuienSale;
      const ocupacion = await (await axios.post('basedatos/getIdOcupacion', { "ocupacion": insertIntoTable.toInsert[userPos].info[4] })).data.idOcupacion;
      const estudio = await (await axios.post('basedatos/getIdEstudio', { "estudio": insertIntoTable.toInsert[userPos].info[5] })).data.idEstudio;
      console.log(genero, edad, gastoSemanal, conQuienSale, ocupacion, estudio);
      //const idUsuario = await axios.post('basedatos/insertUsuario', { "genero": user[0], "edad": user[0], "gastoSemanal": user[0], "conQuienSale": user[0], "ocupacion": user[0], "estudio": user[0] });
    }

    doAll();
  }

  /**
   * Obtiene el siguiente valor de idRespuesta de la BD y lo almacena.
   */
  static idRespuesta(table, category, score) {
    const idR = async () => {
      // const res = await axios.post('/basedatos/getNewIdRespuesta', {});
      // let id = res.data.idRespuesta;
      // let data = [id, category, score];
      // saveParsedAnswer(table, data);
    }

    idR();
  }

  /**
   * Obtiene el siguiente valor de idUsuario de la BD y lo almacena.
   */
  static idUsuario() {
    let id;
    const idUsuario = async () => {
      const res = await axios.post('/basedatos/getNewIdUsuario', {});
      id = res.data.idUsuario;
    }

    idUsuario();
    return id;
  }

  static getScoresByEvent() {
    const getScoresByEvent = async () => {
      const res = await axios.post('/basedatos/getScoresByEvent', {});
      console.log(res.data[0])
      console.log(res.data.length)
    }
  }
}

export { Registroinfo };