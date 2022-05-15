'use strict';

//Selecting Elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currentScorePlayer0 = document.getElementById('current--0');
const currentScorePlayer1 = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// const diceEl = document.querySelector('.dice');
const diceAll = document.querySelectorAll('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

let scores, currentScore, activePlayer, playing;

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
  } //If the element has the class already, javascript WILL NOT ADD it again, and if the element has no class that we are trying to remove, it will skip the step without any mistake
  score0El.textContent = 0;
  score1El.textContent = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  currentScorePlayer0.textContent = currentScore;
  currentScorePlayer1.textContent = currentScore;
  // diceEl.classList.add('hidden');
  diceAll[4].classList.remove('hidden');
};

init();

// ROLLING A DICE FUNTION
btnRoll.addEventListener('click', function () {
  if (playing) {
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    // diceEl.classList.remove('hidden');
    // diceEl.src = `dice-${diceNum}.png`; //This is how you manipulate the Attribute features in tags
    diceAll.forEach(el => el.classList.add('hidden'));
    diceAll[diceNum - 1].classList.remove('hidden');
    if (diceNum !== 1) {
      currentScore += diceNum;
      document.getElementById(
        `current--${activePlayer}` // Creating dynamic variables
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

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

btnNew.addEventListener('click', init);

// INSTEAD OF WRITING ALL THE CODE BELOW INSIDE THE BUTTON, IT IS MOVED AS A SEPARATE FUNCTION TO WORK AT THE PAGE LOAD AND AFTER THE GAME IS RESET

// if (player0El.classList.contains('player--winner')) {
//   player0El.classList.remove('player--winner');
//   player0El.classList.add('player--active');
// } else if (player1El.classList.contains('player--winner')) {
//   player1El.classList.remove('player--winner');
//   player0El.classList.add('player--active');
// } else if (playing && player1El.classList.contains('player--active')) {
//   player0El.classList.toggle('player--active');
//   player1El.classList.toggle('player--active');
// } //If the element has the class already, javascript WILL NOT ADD it again, and if the element has no class that we are trying to remove, it will skip the step without any mistake
// score0El.textContent = 0;
// score1El.textContent = 0;
// activePlayer = 0;
// playing = true;
// scores[0] = 0;
// scores[1] = 0;
// currentScore = 0;
// currentScorePlayer0.textContent = currentScore;
// currentScorePlayer1.textContent = currentScore;
// diceEl.classList.add('hidden');

// THERE IS A FUNCTION FOR THIS CODE

// document.getElementById(`current--${activePlayer}`).textContent = 0;
// currentScore = 0;
// // document
// //   .querySelector(`.player--${activePlayer}`)
// //   .classList.remove('player--active');
// // activePlayer = activePlayer === 0 ? 1 : 0;
// // document
// //   .querySelector(`.player--${activePlayer}`)
// //   .classList.add('player--active'); // THIS IS HOW I DECIDED TO SWITCH STYLES BETWEEN PLAYERS
// activePlayer = activePlayer === 0 ? 1 : 0;
// player0El.classList.toggle('player--active'); // Toggle helps to check if the class is there or not. Then, it changes the condition to the opposite.
// player1El.classList.toggle('player--active'); // THIS IS HOW JONAS DECIDED TO SWITCH STYLES BETWEEN PLAYERS
