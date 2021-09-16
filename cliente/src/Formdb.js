import React from 'react'
import {Registroinfo} from './Registroinfo'
import {Formulario} from './componentes/Formulario'

export const Formdb = () => {
    return (
        <div className="formdb__main">
            {/* <Registroinfo/> */}
            <Formulario 
                preguntas={[["pregunta",2,3,4]]}/>
        </div>
    )
}
