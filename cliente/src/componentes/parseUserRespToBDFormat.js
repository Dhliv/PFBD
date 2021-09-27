import { categorias, puntaje, categoriasPresupuesto } from "./JSONWithQuestions"
import { Registroinfo } from "../Registroinfo";
import insertIntoTable from "../json/insertIntoTable.json";

var categories;
var score;
var infousuario = [];

function saveParsedAnswer(table, data) {
  let aux = {
    table: "",
    info: []
  }

  aux.table = table;
  aux.info = data;
  insertIntoTable.toInsert = insertIntoTable.toInsert.concat(aux);
}

function parseAnswerForBD(nombrePregunta, answer) {
  let category;
  let table;
  let data;

  for (let i = 0; i < categories.length; i++) {
    category = categories[i];
    //aux = JSON.parse(JSON.stringify(template, null, 2)); // Deep copy of template.
    if (category > 0 && category <= 9) { // La respuesta va en la tabla de respuestas.
      table = "respuestas";
      data = [category, score];
      saveParsedAnswer(table, data);
    } else if (category == 0) { // la respuesta va en la tabla de usuario.
      infousuario.push(answer);
    } else if (category == 10) { // La respuesta va en la tabla de presupuesto
      category = categoriasPresupuesto.get(nombrePregunta)[0];
      table = "presupuestos";
      data = [category, answer];
      saveParsedAnswer(table, data);
    }
  }
}

/**
 * Obtiene todas las respuestas a la survey y les aplica el formato para inserción en la BD.
 * @param {JSON} answers respuestas de la survey.
 */
function checkAnswers(answers) {
  let question;
  let answer;
  let nombrePregunta;

  for (let key in answers) {
    question = String(key);
    answer = String(answers[key]);
    score = puntaje.get(answer);

    if (categorias.get(question) !== undefined) nombrePregunta = question;
    else nombrePregunta = question + " " + answer;
    categories = categorias.get(nombrePregunta);
    parseAnswerForBD(nombrePregunta, answer);
  }

  saveParsedAnswer("usuarios", infousuario);
}

export { checkAnswers, saveParsedAnswer };