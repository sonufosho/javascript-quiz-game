import {questions} from '../data/questions.js';

function renderResultHTML() {
  const score = localStorage.getItem('score');

  const scorePercent = (score / questions.length) * 100;
  let quote = '';

  if (scorePercent === 100) {
    quote = "Holy shit! You're a Genius!";
  } else if (scorePercent >= 80) {
    quote = "Soooo close! You were almost there!";
  } else if (scorePercent >= 60) {
    quote = "Well not bad! Keep learning!";
  } else if (scorePercent >= 40) {
    quote = "Something is better than Nothing!";
  } else {
    quote = "Uhh.. Were you even trying?";
  }

  const resultHTML = `
    <p class="score">You scored <span>${score}</span> out of <span>${questions.length}</span></p>
    <p class="quote">${quote}</p>
  `;

  document.querySelector('.js-result').innerHTML = resultHTML;
}

renderResultHTML();

document.querySelector('button').addEventListener('click', () => {
  localStorage.removeItem('score');
  window.location.href = 'quiz.html';
})