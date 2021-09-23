import { categorias, puntaje } from "./JSONWithQuestions"

function checkAllQuestions(answers) {
  let question;
  let answer;
  for (let key in answers) {
    question = String(key);
    answer = String(answers[key]);
    if (categorias.get(question) !== undefined) {
      console.log(categorias.get(question));
    } else {
      console.log(categorias.get(question + " " + answer));
    }
  }
}

export { checkAllQuestions };