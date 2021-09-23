import React from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import neoQ from "../json/neoQ.json";
import { checkAllQuestions } from "./parseUserRespToBDFormat";

Survey.StylesManager.applyTheme("bootstrap");
Survey.defaultBootstrapCss.navigationButton = "btn btn-red";

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

  //console.log(neoQ);
  const survey = new Survey.Model(neoQ);

  survey
    .onComplete
    .add(function (sender) {
      checkAllQuestions(sender.data);
    });

  return (
    <Survey.Survey model={survey} onValueChanged={surveyValueChanged} />
  );
}

export { SurveyComponent };