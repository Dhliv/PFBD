import React from "react";
import { FormatoPregunta } from "./FormatoPregunta"
import { Respuesta } from "./Respuesta";
import { questions } from "../json/questions.json";
import { EnviarFormulario } from "./EnviarFormulario";

// Create a new form, then add a checkbox question, a multiple choice question,
// a page break, then a date question and a grid of questions.


const Formulario = (props) => {

  // let preguntas = questions;

  const jsonFormat = [[-1,
                "titulo",
                [ "pregunta1","pregunta2","pregunta3"],
                [
                  ["Si", 0, 1],
                  ["No", 0, 2],
                  ["No se", 0, 3]
                ]
              ],[-1,
                "titulo2",
                [ "pregunta1","pregunta2","pregunta3"],
                [
                  ["Si", 1, 4],
                  ["No", 1, 5],
                  ["No se", 1, 6]
                ]]]

  console.log(jsonFormat);

  var x = 0;

  return (
    <section>
      <ol>
        {jsonFormat.map(datos =>
          <li>
            <FormatoPregunta texto={datos[1]} >
              
              {datos[2].map(subPregunta =>
                <FormatoPregunta tipo={datos[0]} texto={subPregunta}>
                  
                  <Respuesta respuestasYTipos={datos[3]}/>
                  
                </FormatoPregunta>
              )}

              </FormatoPregunta>
          </li>
        )}
      </ol>
      <EnviarFormulario />
    </section>
  )
};

export { Formulario };


// [
//   tipo, // -1
//   titulo,
//   [
//     preguntas // ""
//   ]
//   [
//     respuestas, tipoRespuesta // (dinero, 1), (ns, 0), (nc, 0);
//   ]
// ]