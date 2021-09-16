import React, { useState } from "react";

function EnviarFormulario(props) {

  const [env, setEnv] = useState("Enviar");
  

  
  const enviarInformacion = () =>{
    setEnv("NO");
    console.log("kjaasdkjasd");
  }

  return(
    
    <button 
      type="submit" 
      onClick={() => enviarInformacion()} 
    >
      {env}
    </button>
  )
}

export { EnviarFormulario }