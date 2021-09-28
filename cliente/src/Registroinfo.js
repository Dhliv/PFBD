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
      const edad = parseInt(insertIntoTable.toInsert[userPos].info[1]);
      const gastoSemanal = parseInt(insertIntoTable.toInsert[userPos].info[2]);
      const conQuienSale = (await axios.post('basedatos/getIdConQuienSale', { "conQuienSale": insertIntoTable.toInsert[userPos].info[3] })).data.idconQuienSale;
      const ocupacion = (await axios.post('basedatos/getIdOcupacion', { "ocupacion": insertIntoTable.toInsert[userPos].info[4] })).data.idOcupacion;
      const estudio = (await axios.post('basedatos/getIdEstudio', { "estudio": insertIntoTable.toInsert[userPos].info[5] })).data.idEstudio;
      console.log(genero, edad, gastoSemanal, conQuienSale, ocupacion, estudio);
      const idUsuario = (await axios.post('basedatos/insertUsuario', {
        "genero": genero, "edad": edad, "gastoSemanal": gastoSemanal, "conQuienSale": conQuienSale, "ocupacion": ocupacion, "estudio": estudio
      }
      )).data.idUsuario;
      console.log(idUsuario);

      for (let i = 0; i < userPos; i++) {
        let table = insertIntoTable.toInsert[i].table;
        let info = insertIntoTable.toInsert[i].info;
      }
    }

    doAll();
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