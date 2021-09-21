import React from 'react';
import ReactDOM from 'react-dom';
import { SurveyComponent } from './componentes/SurveyComponent';
import { JSONWithQuestions } from './componentes/JSONWithQuestions';

import './styles/styles.scss'


JSONWithQuestions.init();
ReactDOM.render(<SurveyComponent />, document.getElementById('root'));
