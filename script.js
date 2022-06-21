'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currentScorePlayer0 = document.getElementById('current--0');
const currentScorePlayer1 = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceAll = document.querySelectorAll('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnCloseInstructions = document.querySelector('.btn-close-instructions');
const btnOpenInstructions = document.querySelector('.btn-open-instructions');
const instructionsContainer = document.querySelector('.instructions-container');

/**
 * switches players once the turn is over
 * @param {}
 * @returns {undefined}
 * @author Jonas Shmedtmann
 */
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

let scores, currentScore, activePlayer, playing;

/**
 * returns value and styles to their default parameters
 * @param {}
 * @returns {undefined}
 * @author Jonas Shmedtmann and Dmitriy Vnuchkov
 */
const init = function () {
  if (player0El.classList.contains('player--winner')) {
    player0El.classList.remove('player--winner');
    player0El.classList.add('player--active');
  } else if (player1El.classList.contains('player--winner')) {
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
  } else if (playing && player1El.classList.contains('player--active')) {
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }
  score0El.textContent = 0;
  score1El.textContent = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  currentScorePlayer0.textContent = currentScore;
  currentScorePlayer1.textContent = currentScore;
  diceAll[4].classList.remove('hidden');
};

init();

/**
 * imitates rolling a dice and adds points to the current score
 * @param {}
 * @returns {undefined}
 * @author Jonas Shmedtmann and Dmitriy Vnuchkov
 */
btnRoll.addEventListener('click', function () {
  if (playing) {
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    diceAll.forEach(el => el.classList.add('hidden'));
    diceAll[diceNum - 1].classList.remove('hidden');
    if (diceNum !== 1) {
      currentScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

/**
 * adds current score to the total player score, and triggers the player switch
 * @param {}
 * @returns {undefined}
 * @author Jonas Shmedtmann
 */
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= '100') {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceAll.forEach(el => el.classList.add('hidden'));
    } else {
      switchPlayer();
    }
  }
});

/**
 * hides the instructions
 * @param {}
 * @returns {undefined}
 * @author Dmitriy Vnuchkov
 */
btnCloseInstructions.addEventListener('click', function () {
  instructionsContainer.style.opacity = '0';
  btnOpenInstructions.style.display = 'block';
  setTimeout(() => (instructionsContainer.style.display = 'none'), 300);
  setTimeout(() => (btnOpenInstructions.style.opacity = '1'), 50);
});

/**
 * displays the instructions
 * @param {}
 * @returns {undefined}
 * @author Dmitriy Vnuchkov
 */
btnOpenInstructions.addEventListener('click', function () {
  btnOpenInstructions.style.opacity = '0';
  setTimeout(() => (btnOpenInstructions.style.display = 'none'), 350);
  instructionsContainer.style.display = 'block';
  setTimeout(() => (instructionsContainer.style.opacity = '1'), 50);
});

btnNew.addEventListener('click', init);
