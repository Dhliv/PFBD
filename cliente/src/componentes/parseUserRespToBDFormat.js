import { categorias, puntaje } from "./JSONWithQuestions"
import { questions } from "../json/questions.json"

var CHECKBOX = 3;
var CHECKBOX2 = 2;

function checkQuestion(posTitulo, posPregunta, answers) {
  let titulo = questions[posTitulo].titulo; // Almacena el título de la pregunta.
  const pregunta = posPregunta !== -1 ? questions[posTitulo].preguntas[posPregunta] : ""; // Almacena el texto de la pregunta.
  const nombre = titulo + (posPregunta !== -1 ? " " + pregunta : ""); // Almacena el nombre único de la pregunta.
  const nCol = questions[posTitulo].respuestas.length; // Almacena el número de respuestas que existen para la pregunta.

  let ans;
  let tabla;
  let score;
  if (answers.nombre === undefined) console.log("No está");
  else {
    // if (posPregunta !== -1) {
    //   ans = categorias.get(nombre);
    // } else {
    //   ans = categorias.get(nombre + " " + answers.nombre);
    //   categorias.set(nombre + " " + questions[posTitulo].respuestas[i][0], questions[posTitulo].categorias[i]);
    // }
    console.log(nombre, " se encuentra aquí");
  }
}

function checkAllQuestions(answers) {
  for (let i = 0; i < questions.length; i++) {
    let nP = questions[i].tipoPregunta;
    if (nP === CHECKBOX || nP === CHECKBOX2) {

      for (let j = 0; j < questions[i].preguntas.length; j++) {
        checkQuestion(i, j, answers);
      }
    } else {
      checkQuestion(i, -1, answers);
    }
  }
}

export { checkAllQuestions };