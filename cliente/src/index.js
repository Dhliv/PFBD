import React from 'react';
import ReactDOM from 'react-dom';
import { SurveyComponent } from './componentes/SurveyComponent';
import { JSONWithQuestions } from './componentes/JSONWithQuestions';
import './styles/styles.scss'
import questions from "./json/questions.json"

console.log(questions.tipado === undefined)
JSONWithQuestions.init()
ReactDOM.render(<SurveyComponent />, document.getElementById('root'))
