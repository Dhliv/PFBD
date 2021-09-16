import React from "react";

function Respuesta(props){


  return(
    <React.Fragment>
      {
        props.respuestas.map(respuesta =>
        <ul>
          <label>
            <input type="checkbox" /> {respuesta}
          </label>
        </ul>
        
        )}
    </React.Fragment>  
    
  )
}

export {Respuesta}