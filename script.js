'use strict';

//choosing elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//starting conditions
let scores, currentScore, activePlayer, playing;
const init = function(){
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
}
init(); 

const switchPlayer = function () {
	document.getElementById(`current--${activePlayer}`).textContent = 0;
	activePlayer = activePlayer === 0 ? 1 : 0;
	currentScore = 0;
	player0El.classList.toggle('player--active');
	player1El.classList.toggle('player--active');
};

//rolling dice functionality
btnRoll.addEventListener('click', function () {
	//random dice roll
	if (playing) {
		const dice = Math.trunc(Math.random() * 6) + 1;

		//display dice
		diceEl.classList.remove('hidden');
		diceEl.src = `dice-${dice}.png`;

		//check if rolled
		if (dice !== 1) {
			currentScore += dice;
			document.getElementById(`current--${activePlayer}`).textContent = currentScore;
		} else {
			//switches player
			switchPlayer();
		}
	}
});

btnHold.addEventListener('click', function () {
	if (playing) {
		//add current score to  active player's score
		scores[activePlayer] += currentScore;
		document.getElementById(`score--${activePlayer}`).textContent =
			scores[activePlayer];

		//100 points end game 1 player won and switch to next player
		if (scores[activePlayer] >= 100) {
			playing = false;
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.add('player--winner');
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.remove('player--active');
			diceEl.classList.add('hidden');
      
		} else {
			switchPlayer();
		}
	}
});


btnNew.addEventListener('click', function () {
  init();
})