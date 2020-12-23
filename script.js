'use strict';

console.log(document.querySelector('.message__answer').textContent);

document.querySelector('.message__answer').textContent = 'Start Guessing!';

///////////////////////////
// Modal Functionality ////

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelector('.show-modal');

const openModal = function () {
  console.log('? clicked');
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnOpenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Tests //

// var x = document.getElementById('fieldset');
// var input = x.getElementsByTagName('input');
// console.log(input[0].value);

// var n = document.getElementsByName('select-character');
// console.log(n.value);
// console.log(document.querySelector('.side-sel__chk').value);

// document.forms.your-form-name.elements.radio-button-name.value

// document.querySelector('input[name="genderS"]:checked').value;
//-------//

// quotes multiple strings stored in an array
var quotes = ["Don't you know who I am?"];

// every time the button is pressed, random whole number needs to be generated
// number will represent the array index number for the quote array
// once we retrieve the randomly generated quote, place it into the HTML doc

// collecting the value from the checked selection on side-nav
document.querySelector('.submit').addEventListener('click', function () {
  const guess = document.querySelector('input[name="select-character"]:checked')
    .value;
  console.log(guess);
});

// what happens when the guess is correct equal to the answer
// what happens when the guess is incorrect

// Randomly generate a quote from a curated list (min of 5)
// reset button should refresh the game and bring it back to the beginning state
// check button should confirm the selection you made to the correct answer and generate a response *wrong* or *correct*
// should also generate the name of the character who said the quote
// also generate the correct image of the character the quote belongs to
// check(submit) button OR next button should start as START first, then manipulate into next after the first go
// next should bring on the next question after you check* your answer
