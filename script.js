"use strict";

// Selecting elements
const player0El = document.querySelector(".player__0");
const player1El = document.querySelector(".player__1");
const score0El = document.querySelector("#score__0");
const score1El = document.getElementById("score__1");
const current0El = document.getElementById("current__0");
const current1El = document.getElementById("current__1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn__new");
const btnRoll = document.querySelector(".btn__roll");
const btnHold = document.querySelector(".btn__hold");

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player__winner");
  player1El.classList.remove("player__winner");
  player0El.classList.add("player__active");
  player1El.classList.remove("player__active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current__${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player__active");
  player1El.classList.toggle("player__active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice_icon${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current__${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score__${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player__${activePlayer}`)
        .classList.add("player__winner");
      document
        .querySelector(`.player__${activePlayer}`)
        .classList.remove("player__active");
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
