import {questions} from '../data/questions.js';

if (performance.getEntriesByType('navigation')[0].type === 'reload') {
    window.location.href = 'index.html';
  }

let currentQuestionIndex = 0;
let score = localStorage.getItem('score') || 0;

function renderquizHTML() {
const qna = questions[currentQuestionIndex];

const quizHTML = `
  <p class="question">${qna.question}</p>
    <div class="header">
      <p>Question <span>${currentQuestionIndex + 1}</span> of <span>${questions.length}</span></p>
      <p>Score: <span class="js-score">${score}</span></p>
    </div>
    <p class="render js-render"></p>
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

setTimeout(() => {
  document.querySelector('.progress').style.width = `${(currentQuestionIndex / questions.length) * 100}%`;
}, 10);

document.querySelectorAll('.answers button').forEach((button) => {
  button.addEventListener('click', () => {

    document.querySelectorAll('.answers button').forEach((btn) => {
        btn.disabled = true;
    });

    const isCorrect = button.dataset.isCorrect;
    
    if (isCorrect === 'true') {
      score++;
      localStorage.setItem('score', score);
      document.querySelector('.js-score').innerHTML = score;

      document.querySelector('.js-render').innerHTML = 'Correct';
      document.querySelector('.js-render').classList.add('correct');
      
      setTimeout(() => {
        document.querySelector('.correct').classList.remove();
      }, 1000);
    } else {
      document.querySelector('.js-render').innerHTML = 'Incorrect';
      document.querySelector('.js-render').classList.add('incorrect');

      setTimeout(() => {
        document.querySelector('.incorrect').classList.remove();
      }, 1000);
    }

    setTimeout(() => {
      if (currentQuestionIndex === questions.length - 1) {
        document.querySelector('.progress').style.width = `${100}%`;
          setTimeout(() => {
          window.location.href = 'result.html';
        }, 1500);
        }

      if (currentQuestionIndex < questions.length) {
        currentQuestionIndex++;
        renderquizHTML();
      }
    }, 1000);
  });
});
}

renderquizHTML();