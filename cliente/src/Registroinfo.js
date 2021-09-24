import axios from 'axios'

class Registroinfo {

  static inserRespuesta() {
    const insertRespuesta = async () => {
      const res = await axios.post('/basedatos/insertRespuesta', { "usuarioID": 1, "idRespuesta": -2147483645 });
      console.log(res.data)
    }
  }

  /**
   * Obtiene el siguiente valor de idRespuesta de la BD y lo almacena.
   */
  static idRespuesta() {
    let id;
    const res = axios.post('/basedatos/getNewIdRespuesta', {});
    id = res.data.idRespuesta;
    console.log(id);
    return id;
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

  static insertUsuario(idUsuario, genero, edad, idOcupacion, idEstudio) {
    let res;
    const insertUsuario = async () => {
      //const res = await axios.post('/basedatos/insertUsuario', { "idUsuario": idUsuario, "genero": genero, "edad": edad, "id_ocupacion": idOcupacion, "id_estudio": idEstudio });
      //console.log(res.data)
      res = idEstudio + idUsuario;
    }
    insertUsuario();
    return res;
  }

  static insertResultadoPreguntas(idRespuesta, idEvento, score) {
    const insertResultadoPreguntas = async () => {
      const res = await axios.post('/basedatos/insertResultadoPreguntas', { "idRespuesta": idRespuesta, "idEvento": idEvento, "score": score });
      console.log(res.data)
    }
    insertResultadoPreguntas();
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