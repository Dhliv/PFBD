import React from "react";
import {Pregunta} from "./Pregunta"
import { Respuesta} from "./Respuesta";

// Create a new form, then add a checkbox question, a multiple choice question,
// a page break, then a date question and a grid of questions.


const Formulario = (props) => {
    
    let preguntas = props.preguntas;
    // props = [[preguntas,respuestas]...[preguntas,respuestas]]

    return(
        <section>
            <ol>
            {preguntas.map(preguntaYRespuesta =>
                <li>
                    <Pregunta key={preguntaYRespuesta[0]} pregunta={preguntaYRespuesta[0]}/>
                    <Respuesta respuestas={preguntaYRespuesta.splice(1,preguntaYRespuesta.length-1)}/>
                </li>
                )}
        
            </ol>
        </section>
    )
};

export {Formulario};
