import React from "react";

function EnviarFormulario(props){

  function enviarInformacion(){
    console.log("Enviar información");
  }

  return(
    
    <button 
      type="button" 
      onClick={() => enviarInformacion} >Enviar </button>
  )
}

export {EnviarFormulario}