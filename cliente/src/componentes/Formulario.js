import React from "react";
import {Pregunta} from "./Pregunta"
import { Respuesta} from "./Respuesta";

// Create a new form, then add a checkbox question, a multiple choice question,
// a page break, then a date question and a grid of questions.


const Formulario = (props) => {
    
    preguntas = props.preguntas;
    // props = [[preguntas,respuestas]...[preguntas,respuestas]]

    return(
        <section>
            <ol>
            {preguntas.map(preguntaYRespuesta =>
                <li>
                    <Pregunta pregunta={preguntaYRespuesta[0]}/>
                    <Respuesta preguntaYRespuestas={preguntaYRespuesta}/>
                </li>
                )}
        
            </ol>
        </section>
    )
};

export {Formulario};
