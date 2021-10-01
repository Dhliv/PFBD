import React from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import neoQ from "../json/neoQ.json";
import { Registroinfo } from "../Registroinfo";

Survey.StylesManager.applyTheme("bootstrap");

/**
 * Listener que identifica cuando ocurre un cambio en los campos de la survey.
 * @param {*} sender 
 * @param {*} options 
 */
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
      Registroinfo.getAnswersAndUploadThem(sender.data);
    });

  return (
    <Survey.Survey model={survey} onValueChanged={surveyValueChanged} />
  );
}

export { SurveyComponent };