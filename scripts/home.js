document.querySelector('.js-start').addEventListener('click', () => {
  localStorage.removeItem('score');
  window.location.href = 'quiz.html';
});