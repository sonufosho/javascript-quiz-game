import {questions} from '../data/questions.js';

let currentQuestionIndex = 0;
let score = 0;

function renderquizHTML() {
const qna = questions[currentQuestionIndex];

const quizHTML = `
  <p class="question">${qna.question}</p>
    <div class="header">
      <p>Question <span>${currentQuestionIndex + 1}</span> of <span>${questions.length}</span></p>
      <p>Score: <span class="js-score">${score}</span></p>
    </div>
    <div class="answers">
      <button data-is-correct="${qna.answers[0].isCorrect}">${qna.answers[0].option}</button>
      <button data-is-correct="${qna.answers[1].isCorrect}">${qna.answers[1].option}</button>
      <button data-is-correct="${qna.answers[2].isCorrect}">${qna.answers[2].option}</button>
      <button data-is-correct="${qna.answers[3].isCorrect}">${qna.answers[3].option}</button>
    </div>
    <div class="progress-bar">
      <div class="progress"></div>
    </div>
`;

document.querySelector('.js-container').innerHTML = quizHTML;

document.querySelectorAll('.answers button').forEach((button) => {
  button.addEventListener('click', (event) => {
    const isCorrect = button.dataset.isCorrect;
      
    if (isCorrect === 'true') {
      score++;
      renderquizHTML();
    }
    
    if (currentQuestionIndex < questions.length) {
      currentQuestionIndex++;
      renderquizHTML();
    }
  });
});
}

renderquizHTML();