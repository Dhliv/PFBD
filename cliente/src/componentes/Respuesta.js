import React from "react";

function Respuesta(props){

  respuestas = props.preguntaYRespuestas.shift();

  return(
    <>
      {respuestas.map(respuesta =>
        <lu>{respuesta}</lu>
        )}
    </>    
  )
}

export {Respuesta}