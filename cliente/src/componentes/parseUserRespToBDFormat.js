import { categorias, puntaje, categoriasPresupuesto } from "./JSONWithQuestions"
import insertIntoTable from "../json/insertIntoTable.json";

var categories; // Array de categorías que pertenecen a a una respuesta en un momento de tiempo dado.
var score; // puntaje que se le asigna a la respuesta.
var infousuario = []; // Ya que la información que se almacena en usuarios está dispersa a lo largo de la encuesta, se hace necesario guardar cada dato en una queue para su posterior inserción.

/**
 * Inserta en el JSON insertIntoTable una tupla de datos, especificando la tabla a la que pertenece y la informcación que debe ir en ella.
 *  
 * @param {String} table nombre de la tabla donde se insertan los datos
 * @param {Array[Object]} data la información que debe insertarse en la tabla indicada
 */
function saveParsedAnswer(table, data) {
  let aux = {
    table: "",
    info: []
  }

  aux.table = table;
  aux.info = data;
  insertIntoTable.toInsert = insertIntoTable.toInsert.concat(aux);
}

/**
 * Determina la tabla en la que va la respectiva respuesta, guardando en un array la información que le corresponde a esa misma tabla.
 * 
 * @param {String} nombrePregunta Identifica a una pregnta de tipo presupuesto para identificar a la categor+ia que pertenece.
 * @param {String} answer Almacena un trozo de información del usuario para su almacenamiento global en 'infousuario'.
 */
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