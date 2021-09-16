import React, {useState} from "react";

function EnviarFormulario(props){

  const [env, setEnv] = useState("Enviar");
  function otraF(){
    setEnv("NO"); 
  }
  const enviarInformacion = () =>{
    otraF();
    setEnv("NO");
  }

  return(
    
    <button 
      type="submit" 
      onClick={() => enviarInformacion} 
    >
      {env} 
    </button>
  )
}

export {EnviarFormulario}