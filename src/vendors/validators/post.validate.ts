import { RegexUtils } from "../utils/regex.utils";

export class PostValidate {


    private errorInputArr: Array<Object> = [];

    private errorIput: any = null;

  private stg(
    el: any,
    inputName: any,
    request: any,
    message: any,
    limit = 3
  ) {
    if (el === inputName && request[el].length < limit) {
      this.errorInputArr.push({
        path: el,
        message: message,
      });
      this.errorIput = true;
      return {
        error: this.errorIput,
        context: this.errorInputArr,
      };
    }
  }

  public async create(request: any) {
    

    // Get all key object of data
    const objectRequestKey = Object.keys(request);

    // Handle error by the stements
    objectRequestKey.forEach((el) => {
      // firstname
      this.stg(el, 'description', request, 'Require 20 charactere mimium.')
      

   

      
    });

    return {
      error: this.errorIput,
      context: this.errorInputArr,
    };
  }



  // let getQuestion = JSON.parse(localStorage.getItem('questions'));


  // let questions = [
  //     {
  //     numb: 1,
  //     question: getQuestion[0].libelle,
  //     answer: "Hyper Text Markup Language",
  //     options: [
  //       "Hyper Text Preprocessor",
  //       "Hyper Text Markup Language",
  //       "Hyper Text Multiple Language",
  //       "Hyper Tool Multi Language"
  //     ]
  //   }
  // ],



  // let questions = []
  // getQuestion.forEach((quiz, index) => {

  //   // Ajouter dans le tableau comme object
  //   const putQuizByStep = {
  //     'numb': index,
  //     'question': quiz.libelle,
  //     'answer': '',
  //     'options': [

  //     ]
  //   }

  //   // Ici je recupere les reponses
  //   quiz.reponses.forEach((res) => {
  //     putQuizByStep.answer = res.reponse_correct ? res.reponse_correct : null
  //     putQuizByStep.options.push(res.reponse_a, res.reponse_b, res.reponse_c, res.reponse_d) //etc...
  //   });

  //   putQuizByStep

  //   questions.push(putQuizByStep)
  //   console.log(putQuizByStep)

  // })


 
  //   getQuestion.forEach((quiz, index) => {
  //     let arrayQuiz = []
  
  //     quiz.question.forEach(q => {
  //       arrayQuiz.push(q.libelle)
  //   });

    
    
  //   arrayQuiz = []
  // })



}
  

