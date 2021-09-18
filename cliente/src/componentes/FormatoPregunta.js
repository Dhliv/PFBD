import { React } from "react";
import { Respuesta } from "./Respuesta";

function FormatoPregunta(props) {

  return (
    <React.Fragment>
      <h2>{props.texto}</h2>
      <ul>{props.children}</ul>
    </React.Fragment>
  );
}

export { FormatoPregunta }
