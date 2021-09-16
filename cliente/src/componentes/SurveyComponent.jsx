import React, { Component } from "react";

import * as Survey from "survey-react";

import "survey-react/survey.css";
import "./index.css";
import json2 from "../json/neoQ.json";
import { questions } from "../json/questions.json"

Survey.StylesManager.applyTheme("default");

var tipoPregunta = ["checkbox", "radiogroup", "radiogroup", "checkbox"];

class SurveyComponent extends Component {
  constructor() {
    super();
  }

  addQuestion(tipo, pos) {
    const valorDado = "funcionará?";
    var json = [
      {
        type: tipo,
        name: questions[pos].titulo,
        title: questions[pos].titulo,
        isRequired: true,
        hasNone: true,
        colCount: 4,
        rateValues: [
          { value: 1, text: valorDado },
          { value: 2, text: "No Contesta" },
          { value: 3, text: "0" },
          { value: 4, text: "1" },
          { value: 5, text: "2" },
          { value: 6, text: "3" },
          { value: 7, text: "4" },
          { value: 8, text: "5" }
        ],
        choices: [
          "Ford",
          "Vauxhall",
          "Volkswagen",
          "Nissan",
          "Audi",
          "Mercedes-Benz",
          "BMW",
          "Peugeot",
          "Toyota",
          "Citroen"
        ]
      }
    ];

    return json;
  }

  render() {

    json2.questions = json2.questions.concat(this.addQuestion("rating", 0));
    json2.questions = json2.questions.concat(this.addQuestion("checkbox", 1));
    json2.questions = json2.questions.concat(this.addQuestion("radiogroup", 2));
    const survey = new Survey.Model(json2);

    return <Survey.Survey model={survey} />;
  }
}

export default SurveyComponent;
