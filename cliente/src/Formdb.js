import React from 'react'
import {Registroinfo} from './Registroinfo'
import {Formulario} from './componentes/Formulario'
import {EnviarFormulario} from './componentes/EnviarFormulario'

export const Formdb = () => {
    return (
        <div className="formdb__main">
            {/* <Registroinfo/> */}
            <Formulario preguntas={[["pregunta",2,3,4],["pregunta2",1,3,4],["pregunta3",1,3,4]]}/>
            <EnviarFormulario />
        </div>
    )
}
