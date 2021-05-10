'use strict';

/////////////////////////////////////////
// Selections
/////////////////////////////////////////

// Player Nav
const playerNav = document.querySelector('.player-nav');
const resetBtn = document.querySelector('.reset');
const nextBtn = document.querySelector('.next');
const skipBtn = document.querySelector('.skip');
const starIcon = document.querySelector('.overview__icon-star');

// Modal items
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelector('.show-modal');

// Side Form
const choices = Array.from(document.querySelectorAll('.side-sel__chk'));
const submitBtn = document.querySelector('.submit');
const formSubmit = document.querySelector('#form');

// Game Container

const quoteTextAnswer = document.querySelector('.quote__text');
const quoteNameAnswer = document.querySelector('.quote__name p');
const messageAnswer = document.querySelector('.message__answer');
const messageChar = document.querySelector('.message__char');
const imgChar = document.querySelector('.character-img');

/////////////////////////////////////////
////  Starting Conditions
////////////////////////////////////////

// quotes multiple strings stored in an array
const quotes = [
  { quote: "Don't you know who I am?", name: 'Madisyn' },
  { quote: "You're Welcome.", name: 'Madisyn' },
  { quote: 'Initiating YOLO protocol!', name: 'Async' },
  { quote: "Yes I'll carry your shopping goods for you.", name: 'Async' },
  { quote: "It's funny, it should hurt but it doesn't.", name: 'Lorelei' },
  { quote: "You're safe now princess.", name: 'Lorelei' },
  { quote: 'Can I punch her now?', name: 'Vesper' },
  { quote: 'The General is mine.', name: 'Vesper' },
];

////////////////////////////////////////
//// Global Variables
////////////////////////////////////////

// Generate random 5 quotes from selection without repetitions
const generate5Quotes = function (quotesArray) {
  return [...quotesArray]
    .sort(() => (Math.random() > 0.5 ? 1 : -1))
    .slice(0, 5);
};

// create new quotes array

let initQuotes = generate5Quotes(quotes);
let curQuote = '';
let curCharacter = '';
let curAnswer = '';
let curCharacterMsg = '';
// let curCharacterImg = '';
let curGuess = '';

///////////////////////////////////////
// Test
///////////////////////////////////////

let acceptingAnswers = true;
let score = 0;
let currentQuestion = '';
let currentCharacter = '';
let questionCounter = 0;
let availableQuestions = [];

availableQuestions = [...initQuotes];

const SCORE_POINTS = 5;
const MAX_QUESTIONS = 5;

/////////////////////////////////////////
////  Functions
////////////////////////////////////////

// initialize game function
const init = function () {
  // Beginning DOM
  nextBtn.textContent = '';
  nextBtn.textContent = 'START';
  quoteTextAnswer.textContent = 'Think you can handle it?';
  quoteNameAnswer.textContent = 'Hit that Start button!';
  messageAnswer.textContent = 'Start Guessing!';
  messageChar.textContent = '';
  imgChar.style.display = 'none';

  initQuotes = generate5Quotes(quotes);
  curQuote = '';
  curCharacter = '';
  curAnswer = '';
  curCharacterMsg = '';
  //  curCharacterImg = '';
  curGuess = '';

  ///////////////////////////////////////
  // Test
  ///////////////////////////////////////

  acceptingAnswers = true;
  score = 0;
  currentQuestion = '';
  currentCharacter = '';
  questionCounter = 0;
  availableQuestions = [];

  availableQuestions = [...initQuotes];
};

// imgChar should be a basic black square with a ? maybe?

/////////////////////////////////////////
//// Initialize Game
/////////////////////////////////////////

init();

////////////////////////////
// NEW QUOTE FUNCTIONS/////
//////////////////////////

const getNextQuote = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    quoteTextAnswer.textContent =
      "That's all there is! Great job, see you next time.";
    messageAnswer.textContent = 'Reset to play again!';
    acceptingAnswers = false;
    quoteNameAnswer.textContent = '';
    return;
  }

  // Clear previous content in DOM
  quoteTextAnswer.textContent = '';
  quoteNameAnswer.textContent = '';
  messageAnswer.textContent = '';
  messageChar.textContent = '';
  imgChar.style.display = 'none';

  questionCounter++;
  // remove a star HTML element
  // starIcon.remove();

  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  let { quote, name } = availableQuestions[randomIndex];
  currentQuestion = quote;
  currentCharacter = name;
  curAnswer = currentCharacter;
  // console.log(curAnswer, 'get next quote name');

  quoteTextAnswer.textContent = currentQuestion;

  // choices.forEach(choice => {
  //   const charSelect = choice.value('name');

  // })

  availableQuestions.splice(randomIndex, 1);

  acceptingAnswers = true;
};

// ////////////////////////////
// //   Load New Quote   /////

const loadNewQuote = function (e) {
  e.preventDefault();
  if (e.target.classList.contains('new-quote')) {
    // console.log('new quote');

    if (e.target.textContent === 'START') {
      // Clear START
      nextBtn.textContent = '';
      // Change to NEXT
      nextBtn.textContent = 'NEXT';
    }

    // if (e.target.textContent === 'NEXT') {
    // }

    // check if form submitted

    // generate new quote
    getNextQuote();
  }
};

////////////////////////////
//  SKIP ANSWER          //

const skipAnswer = function (e) {
  e.preventDefault();
  if (currentQuestion === '') {
    window.alert("You haven't started the game yet silly!");
    return;
  }
  if (questionCounter === 5) {
    window.alert('You finished the game, reset to play again!');
    return;
  }
  // Load Correct Answer in DOM
  // Skip msg
  messageAnswer.textContent = 'Skipped, click NEXT';
};

////////////////////////////
//   Modal Functionality //
///////////////////////////

const openModal = function () {
  console.log('? clicked');
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

///////////////////////////
// Check Character Guess //
///////////////////////////

const checkAnswer = function (e) {
  e.preventDefault();
  const guess = document.querySelector(
    'input[name="select-character"]:checked'
  ).value;
  let curGuess = guess;
  // console.log(curGuess);

  curGuess === curAnswer
    ? (messageAnswer.textContent = 'Correct Answer!')
    : (messageAnswer.textContent = 'Wrong Answer!');
  // console.log(curAnswer);

  quoteNameAnswer.textContent = curAnswer;
};

/////////////////////////
// Event Handlers     //
///////////////////////

// Next Questions
skipBtn.addEventListener('click', skipAnswer);
resetBtn.addEventListener('click', init);
nextBtn.addEventListener('click', loadNewQuote);

// Modal Window
btnOpenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Check Character Guess
submitBtn.addEventListener('click', checkAnswer);

// what happens when the guess is correct equal to the answer
// what happens when the guess is incorrect
// define that random quote - only defined once when we start the game/application

// choices.forEach(choice => {
//   choice.addEventListener('click', e => {
//     e.preventDefault();
//     if (!acceptingAnswers) return;

//     acceptingAnswers = false;
//     const selectedChoice = e.target;
//     const selectedAnswer = selectedChoice.value;

//     let resultMsg =
//       selectedAnswer === currentCharacter
//         ? (messageAnswer.textContent = 'Correct Answer!')
//         : (messageAnswer.textContent = 'Wrong Answer!');

//     if (resultMsg === 'Correct Answer!') {
//       incrementScore(SCORE_POINTS);
//     }
//   });
// });

// /////////////////////////////////////////
// ////  Header - Player Nav
// ////////////////////////////////////////

// ////////////////////////////
// //  Generate New Quote   //

// const generateNewQuote = function (array) {
//   // Clear previous content in DOM
//   quoteTextAnswer.textContent = '';
//   quoteNameAnswer.textContent = '';
//   messageAnswer.textContent = '';
//   messageChar.textContent = '';
//   imgChar.style.display = 'none';

//   if (array.length !== 0) {
//     let randomIndex = Math.floor(Math.random() * array.length);
//     let { quote, name } = array[randomIndex];

//     array.splice(randomIndex, 1);
//     // console.log(array);
//     // New Quote content in DOM
//     quoteTextAnswer.textContent = quote;

//     curQuote = quote;
//     curCharacter = name;
//   } else {
//     quoteTextAnswer.textContent =
//       "That's all there is! Great job, see you next time.";
//     messageAnswer.textContent = 'Reset to play again!';
//   }
// };

// // const generateNewQuote = function () {
// //   let cloneQuotes = [...quotes];
// //   let randomIndex = Math.floor(Math.random() * cloneQuotes.length);
// //   let { quote, name } = cloneQuotes[randomIndex];

// //   if (cloneQuotes.length === 0) {
// //     quoteTextAnswer.textContent = "That's all there is, good job!";
// //   }

// //   cloneQuotes.splice(randomIndex, 1);
// //   // console.log(cloneQuotes);

// //   // Clear previous content
// //   quoteTextAnswer.textContent = '';
// //   quoteNameAnswer.textContent = '';
// //   // New Quote content
// //   quoteTextAnswer.textContent = quote;
// //   // quoteNameAnswer.textContent = name;
// // };

// // once we retrieve the randomly generated quote, place it into the HTML doc along with the character name in a different spot

// // first have game run until all the quotes are used
// // also force stop the application after 5 questions including skips
// // array = []; || array.length === 0
