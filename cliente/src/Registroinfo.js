import React, {useState} from 'react'

import axios from 'axios'
export const Registroinfo = () => {

  const [documento, setDocumento] = useState('')
  const [nombre, setNombre] = useState('')
  const [carrera, setCarrera] = useState('')
  const [semestre, setSemestre] = useState('')



    const guardabase = async () => {
        const res = await axios.post('/basedatos/insertarestudiante', { codigo: documento, nombre, carrera, semestre});
        console.log(res.data)
        setDocumento('')
        setNombre('')
        setCarrera('')
        setSemestre('')
      }

      const consulta = async () => {
        const aux = await axios.post('/basedatos/consultarestudiante', {codigo: documento});
        const est = aux.data
        console.log('UPDATED!')
        if(est.est == 0) setNombre('Este estudiante no existe')
        else{
          setNombre(est.nombre)
          setCarrera(est.carrera)
          setSemestre(est.semestre)
        }
      }

      const elimina = async () => {
        const res = await axios.post('/basedatos/deleteestudiante', {codigo: documento});
        console.log(res.data)
      }

      const actualiza = async () => {
        const res = await axios.post('/basedatos/updateestudiante', { codigo: documento, nombre, carrera, semestre});
        console.log(res.data)
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
        guardabase()
      }
    
    const consultar = () => {
        consulta()
      }

    const eliminar = () => {
        elimina()
      }

    const update = () => {
        actualiza()
      }

    const clear = () => {
        clean()
      }


    return (
        <div  className="formdb__box-containter">
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
                onClick={()=>inserta()}
                > 
                Insertar Datos
                </button> 

                <br></br>
                <br></br>

                <button
                className="btn btn-primary" 
                type="button"
                onClick={()=>consultar()}
                > 
                Consultar
                </button>

                <br></br>
                <br></br>

                <button
                className="btn btn-primary" 
                type="button"
                onClick={()=>update()}
                > 
                Actualizar
                </button>

                <br></br>
                <br></br>

                <button
                className="btn btn-primary" 
                type="button"
                onClick={()=>eliminar()}
                > 
                Eliminar
                </button>

                <br></br>
                <br></br>

                <button
                className="btn btn-primary" 
                type="button"
                onClick={()=>clear()}
                > 
                Clear
                </button>

            </form>
        </div>
    )
}