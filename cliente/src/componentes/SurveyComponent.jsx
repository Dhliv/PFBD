import React, { Component } from "react";

import * as Survey from "survey-react";

import "survey-react/survey.css";
import "./index.css";
import neoQ from "../json/neoQ.json";
import { questions } from "../json/questions.json"

Survey.StylesManager.applyTheme("default");

var tipoPregunta = ["checkbox", "radiogroup", "radiogroup", "checkbox", "text"];
var titulo;
const CHECKBOX = 3;
const CHECKBOX2 = 2;

function addQuestion(posTitulo, posPregunta) {
  
  const tipo = tipoPregunta[questions[posTitulo].tipoPregunta];
  titulo = questions[posTitulo].titulo;
  const respuesta = posPregunta !== -1 ? questions[posTitulo].preguntas[posPregunta] : "";
  const nombre = posPregunta !== -1 ? titulo + " " + respuesta : titulo;
  const nCol = questions[posTitulo].respuestas.length;
  const choices = [];

  for (let i = 0; i < nCol; i++) {
    choices.push(questions[posTitulo].respuestas[i][0]);
  }

  let question = [
    {
      type: tipo,
      name: nombre,
      title: posPregunta !== -1 ? respuesta : titulo,
      isRequired: false,
      inputType: "number",
      hasNone: false,
      colCount: Math.max(1, Math.floor(nCol / 2)),
      choices: choices
    }
  ];

  return question;
}


function createJson(){

  var aux = {
    title: titulo,
    questions: []
  };
  

  for (let i = 0; i < questions.length; i++) {
    let nP = questions[i].tipoPregunta;
    if (nP === CHECKBOX || nP === CHECKBOX2) {

      for (let j = 0; j < questions[i].preguntas.length; j++) {
        aux.questions = aux.questions.concat(addQuestion(i, j));
      }
      neoQ.pages = neoQ.pages.concat(aux);
      
      aux = {
        title: titulo,
        questions: []
      };
    } else {
      
      aux.questions = aux.questions.concat(addQuestion(i, -1));
      neoQ.pages = neoQ.pages.concat(aux);
      
      aux = {
        title: titulo,
        questions: []
      };
    }
  }
}

function SurveyComponent() {

  createJson();
  const survey = new Survey.Model(neoQ);
  console.log(neoQ);

    return(
      <Survey.Survey model={survey} />
      );
}

export {SurveyComponent};



/**
 * var json = {
    questionTitleLocation: "top",
    showQuestionNumbers: "on",
    pages: [
        {
            name: "Address",
            title: "Address",
            questions: [
                {
                    type: "text",
                    name: "address1",
                    title: "Street Address"
                }, {
                    type: "text",
                    name: "address2",
                    title: "Address Line 2"
                }, {
                    type: "text",
                    name: "city",
                    title: "City"
                }, {
                    type: "text",
                    name: "state",
                    startWithNewLine: false,
                    title: "State / Province / Region"
                }, {
                    type: "text",
                    name: "zip",
                    title: "Zip / Postal Code"
                }, {
                    type: "dropdown",
                    name: "country",
                    startWithNewLine: false,
                    title: "Country",
                    choicesByUrl: {
                        url: "https://restcountries.eu/rest/v2/all",
                        valueName: "name"
                    }
                }
            ]
        }
    ]
};
 * 
 */