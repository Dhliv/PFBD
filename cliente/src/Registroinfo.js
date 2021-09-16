import React, { useState } from 'react'
import axios from 'axios'
import { questions } from "./json/questions.json";

export const Registroinfo = () => {

  const [documento, setDocumento] = useState('')
  const [nombre, setNombre] = useState('')
  const [carrera, setCarrera] = useState('')
  const [semestre, setSemestre] = useState('')



  const guardabase = async () => {
    const res = await axios.post('/basedatos/recibirFormulario', { codigo: documento, nombre });
    console.log(res.data)
    setDocumento('')
    setNombre('')
    setCarrera('')
    setSemestre('')
  }

  const insertRespuesta = async () => {
    const res = await axios.post('/basedatos/insertRespuesta', { "usuarioID": 1, "idRespuesta": -2147483645 });
    console.log(res.data)
    setDocumento('')
    setNombre('')
    setCarrera('')
    setSemestre('')
  }

  const idRespuesta = async () => {
    const res = await axios.post('/basedatos/getNewIdRespuesta', {});
    console.log(res.data.idRespuesta);
    setDocumento('')
    setNombre('')
    setCarrera('')
    setSemestre('')
  }

  const insertUsuario = async () => {
    const res = await axios.post('/basedatos/insertUsuario', { "genero": 1, "edad": 21, "id_ocupacion": 1, "id_estudio": 1 });
    console.log(res.data)
    setDocumento('')
    setNombre('')
    setCarrera('')
    setSemestre('')
  }

  const insertResultadoPreguntas = async () => {
    const res = await axios.post('/basedatos/insertResultadoPreguntas', { "idRespuesta": -2147483645, "idEvento": 4, "score": 2 });
    console.log(res.data)
    setDocumento('')
    setNombre('')
    setCarrera('')
    setSemestre('')
  }

  const getScoresByEvent = async () => {
    const res = await axios.post('/basedatos/getScoresByEvent', {});
    console.log(res.data[0])
    console.log(res.data.length)
    setDocumento('')
    setNombre('')
    setCarrera('')
    setSemestre('')
  }

  const clean = async () => {
    setDocumento('')
    setNombre('')
    setCarrera('')
    setSemestre('')
  }

  const onChangedc = (e) => {
    setDocumento(e.currentTarget.value);
  };

  const onChangenm = (e) => {
    setNombre(e.currentTarget.value);
  };

  const onChangecr = (e) => {
    setCarrera(e.currentTarget.value)
  }

  const onChangese = (e) => {
    setSemestre(e.currentTarget.value)
  }



  const inserta = () => {
    let respuestas = [];
  }

  const clear = () => {
    clean()
  }


  return (
    <div className="formdb__box-containter">
      <h3 className="auth__title">CRUD usando React, Postgress y Heroku</h3>
      <form>
        <input
          className="auth__input"
          type="text"
          placeholder="documento"
          name="documento"
          value={documento}
          autoComplete="off"
          onChange={onChangedc}
        />


        <input
          className="auth__input"
          type="text"
          placeholder="nombre"
          name="nombre"
          value={nombre}
          autoComplete="off"
          onChange={onChangenm}
        />


        <input
          className="auth__input"
          type="text"
          placeholder="carrera"
          name="carrera"
          value={carrera}
          onChange={onChangecr}
          autoComplete="off"
        />

        <input
          className="auth__input"
          type="text"
          placeholder="semestre"
          name="semestre"
          value={semestre}
          onChange={onChangese}
          autoComplete="off"
        />



        <button
          className="btn btn-primary"
          type="button"
          onClick={() => inserta()}
        >
          Insertar Datos
        </button>

        <br></br>
        <br></br>

        <button
          className="btn btn-primary"
          type="button"
          onClick={() => clear()}
        >
          Clear
        </button>

      </form>
    </div>
  )
}
