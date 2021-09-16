import React, { useState } from "react";

function EnviarFormulario(props) {

  const [env, setEnv] = useState("Enviar");
  function otraF() {
    setEnv("NO");
  }
  const enviarInformacion = () => {
    otraF();
    setEnv("NO");
    console.log("kjaasdkjasd");
  }

  return (

    <button
      type="submit"
      onClick={() => enviarInformacion()}
    >
      {env}
    </button>
  )
}

export { EnviarFormulario }