import { categorias, puntaje } from "./JSONWithQuestions"
import { Registroinfo } from "../Registroinfo";
import insertIntoTable from "../json/insertIntoTable.json";

var categories;
var score;
var idUsuario;
var idRespuesta;

function saveParsedAnswer(table, data) {
  let aux = {
    table: "",
    info: []
  }

  aux.table = table;
  aux.info = data;
  insertIntoTable.toInsert = insertIntoTable.toInsert.concat(aux);
}

function parseAnswerForBD() {
  let template = {
    table: "",
    info: []
  }

  let aux;
  let category;
  let table;

  for (let i = 0; i < categories.length; i++) {
    category = categories[i];
    //aux = JSON.parse(JSON.stringify(template, null, 2)); // Deep copy of template.
    if (category > 0 && category <= 9) { // La respuesta va en la tabla de respuestas.
      table = "resultado_preguntas";
      Registroinfo.idRespuesta(table, category, score);
    } else { // La respuesta va en otra parte.

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
  idUsuario = Registroinfo.idUsuario();

  for (let key in answers) {
    question = String(key);
    answer = String(answers[key]);
    score = puntaje.get(answer);

    if (categorias.get(question) !== undefined) categories = categorias.get(question);
    else categories = categorias.get(question + " " + answer);
    parseAnswerForBD();
  }

  console.log(insertIntoTable.toInsert);
}

export { checkAnswers, saveParsedAnswer };