import React, { Component } from "react";

import * as Survey from "survey-react";

import "survey-react/survey.css";
import neoQ from "../json/neoQ.json";

Survey.StylesManager.applyTheme("bootstrap");
Survey.defaultBootstrapCss.navigationButton = "btn btn-red";

var map = new Map();

var surveyValueChanged = function (sender, options) {
  var el = document.getElementById(options.name);
  if (el) {
    el.value = options.value;
  }
};

/**
 * Crea la encuesta y retorna el componente jsx grafico.
 *  @return componente que almacena la encuesta.
 */
function SurveyComponent() {

  const survey = new Survey.Model(neoQ);

  survey
    .onComplete
    .add(function (sender) {
      console.log(JSON.stringify(sender.data, null, 2));
    });

  return (
    <Survey.Survey model={survey} onValueChanged={surveyValueChanged} />
  );
}

export { SurveyComponent };