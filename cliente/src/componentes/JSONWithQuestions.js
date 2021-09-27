import neoQ from "../json/neoQ.json";
import { questions } from "../json/questions.json"

var tipoPregunta = ["checkbox", "radiogroup", "radiogroup", "checkbox", "text", "text"];
var CHECKBOX = 3;
var CHECKBOX2 = 2;
var ABIERTAMULTIPLE = 5;
var titulo = "";
var categorias = new Map();
var puntaje = new Map();
var categoriasPresupuesto = new Map();

class JSONWithQuestions {

  static init() {
    this.createJson();
  }

  /**
   * Crea una pregunta con el formato adecuado para usar con la librería "survey-react".
   * 
   * @param {int} posTitulo posición del titulo de la pregunta.
   * @param {int} posPregunta posición de la pregunta en su categoría (titulo).
   * @returns {JSON} con los parametros adecuados para usar en la librería de "survey-react".
   */
  static addQuestion(posTitulo, posPregunta) {
    titulo = questions[posTitulo].titulo; // Almacena el título de la pregunta.
    const pregunta = posPregunta !== -1 ? questions[posTitulo].preguntas[posPregunta] : ""; // Almacena el texto de la pregunta.
    const nombre = titulo + (posPregunta !== -1 ? " " + pregunta : ""); // Almacena el nombre único de la pregunta.
    const tipo = tipoPregunta[questions[posTitulo].tipoPregunta]; //Almacena el tipo de pregunta que corresponde(checkbox,radiogroup,etc)
    const nCol = questions[posTitulo].respuestas.length; // Almacena el número de respuestas que existen para la pregunta.
    const presupuesto = questions[posTitulo].presupuesto === 1 ? true : false; // Almacena si la pregunta está relacionada al presupuesto.
    let choices = []; // Almacena las opciones de respuesta a la pregunta.

    // Se agregan las opciones de respuesta a choices.
    for (let i = 0; i < nCol; i++) {
      let ans = questions[posTitulo].respuestas[i][0];
      choices.push(ans);
      //Ingresamos en el mapa el puntaje que corresponde a la respuesta 'ans'.
      puntaje.set(ans, questions[posTitulo].respuestas[i][1]);
    }

    // Se agrega al mapa 'categorias' las categorias que corresponden a la pregunta/respuesta.
    if (posPregunta !== -1) {
      categorias.set(nombre, questions[posTitulo].categorias[posPregunta]);
      if (presupuesto)
        categoriasPresupuesto.set(nombre, questions[posTitulo].pertenecen[posPregunta]);
    } else if (questions[posTitulo].tipoPregunta != 4) {
      for (let i = 0; i < nCol; i++) {
        // Se concatena el nombre y la respuesta para identificar categorias en diferentes preguntas.
        categorias.set(nombre + " " + questions[posTitulo].respuestas[i][0], questions[posTitulo].categorias[i]);
        if (presupuesto)
          categoriasPresupuesto.set(nombre + " " + questions[posTitulo].respuestas[i][0], questions[posTitulo].pertenecen[i]);
      }
    } else {
      categorias.set(nombre, questions[posTitulo].categorias[0]);
      if (presupuesto)
        categoriasPresupuesto.set(nombre, questions[posTitulo].pertenecen[0]);
    }

    // Se crea un json con el formato adecuado.
    let question = [
      {
        type: tipo,
        name: nombre,
        title: posPregunta !== -1 ? pregunta : titulo,
        inputType: "number",
        //isRequired: true,
        hasNone: false,
        colCount: Math.max(1, Math.floor(nCol / 2)),
        choices: choices
      }
    ];

    return question;
  }

  /**
   * Añade y separa todas las preguntas en paginas y guarda la encuesta en el documento Json "neoQ".
   */
  static createJson() {

    var template = {
      title: "",
      questions: []
    };
    var aux = JSON.parse(JSON.stringify(template, null, 2)); // Deep copy

    for (let i = 0; i < questions.length; i++) {
      let nP = questions[i].tipoPregunta;
      if (nP === CHECKBOX || nP === CHECKBOX2 || nP === ABIERTAMULTIPLE) {

        if (aux !== template) {
          neoQ.pages = neoQ.pages.concat(aux);
          aux = JSON.parse(JSON.stringify(template, null, 2)); // Deep copy.
        }

        for (let j = 0; j < questions[i].preguntas.length; j++) {
          aux.questions = aux.questions.concat(this.addQuestion(i, j));
        }
        aux.title = titulo;
        neoQ.pages = neoQ.pages.concat(aux);

        aux = JSON.parse(JSON.stringify(template, null, 2)); // Deep copy.
      } else {
        aux.questions = aux.questions.concat(this.addQuestion(i, -1));
      }
    }

    if (aux !== template) { // Se agregan las preguntas finales.
      neoQ.pages = neoQ.pages.concat(aux);
    }
  }
}

export { JSONWithQuestions, categorias, puntaje, categoriasPresupuesto }