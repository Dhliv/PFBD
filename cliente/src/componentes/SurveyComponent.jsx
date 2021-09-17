import React, { Component } from "react";

import * as Survey from "survey-react";

import "survey-react/survey.css";
import "./index.css";
import preguntas from "../json/neoQ.json";
import { questions } from "../json/questions.json"

Survey.StylesManager.applyTheme("default");

var tipoPregunta = ["checkbox", "radiogroup", "radiogroup", "checkbox", "text"];

class SurveyComponent extends Component {
  constructor() {
    super();
  }

  addQuestion(posTitulo, posPregunta) {
    const tipo = tipoPregunta[questions[posTitulo].tipoPregunta];
    const titulo = questions[posTitulo].titulo;
    const respuesta = posPregunta != -1 ? questions[posTitulo].preguntas[posPregunta] : "";
    const nombre = posPregunta != -1 ? titulo + " " + respuesta : titulo;
    const nCol = questions[posTitulo].respuestas.length;
    const choices = [];

    for (let i = 0; i < nCol; i++) {
      choices.push(questions[posTitulo].respuestas[i][0]);
    }

    let json = [
      {
        type: tipo,
        name: nombre,
        title: posPregunta != -1 ? respuesta : titulo,
        isRequired: true,
        inputType: "number",
        hasNone: false,
        colCount: Math.max(1, Math.floor(nCol / 2)),
        choices: choices
      }
    ];

    return json;
  }

  render() {

    for (let i = 0; i < questions.length; i++) {
      let nP = questions[i].tipoPregunta;
      if (nP == 2 || nP == 3) {
        for (let j = 0; j < questions[i].preguntas.length; j++) {
          preguntas.questions = preguntas.questions.concat(this.addQuestion(i, j));
        }
      } else {
        preguntas.questions = preguntas.questions.concat(this.addQuestion(i, -1));
      }
    }
    const survey = new Survey.Model(preguntas);

    return <Survey.Survey model={survey} />;
  }
}

export default SurveyComponent;
