import React from "react";

function Respuesta(props){

  console.log("respuestas: " + props.respuestasYTipos);
  const tipo = "radio";

  return(
    <form>
      {
        props.respuestasYTipos.map(respuestaYTipo =>
        <ul >
            <input type={tipo} /> {respuestaYTipo[0]}
        </ul>
        
        )}
    </form>  
    
  )
}

export {Respuesta}