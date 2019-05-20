//Set global variables


let time = 0;
let clockOff = true;
let clockID;
let moves = 0;


//Start the clock
function startClock(){
  clockID = setInterval(() => {
    time++;
    displayTime();
    //console.log(time);
  }, 1000);
}


//Create a list that holds all of my cards


const cards = ['fa-utensils', 'fa-utensils', 'fa-stroopwafel','fa-stroopwafel',
               'fa-lemon', 'fa-lemon', 'fa-apple', 'fa-apple', 'fa-glass-martini', 'fa-glass-martini',
               'fa-beer', 'fa-beer', 'fa-coffee', 'fa-coffee', 'fa-birthday-cake', 'fa-birthday-cake'];

//Thanks to my Udacity mentor @Helmuth Breitenfellner for his help with the generateCard function

function generateCard(card){
  let classX = `fas ${card}`;
  if (card == 'fa-apple') {
    classX = `fab ${card}`;
  }
  return `<li class="card" data-card="${card}"><i class="${classX}"></i></li>`;
};


//Shuffle cards
const deck = document.querySelector('.deck');

function ShuffleDeck(){
  const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
  const shuffledCards = shuffle(cardsToShuffle);
  for (let card of shuffledCards){
    deck.appendChild(card);
  }
}
ShuffleDeck();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Add moves
function addMove(){
  const movesText = document.querySelector('.moves');
  movesText.innerHTML = moves;
}


//Check if click is valid
function isClickValid(clickTarget){
  return (
    clickTarget.classList.contains('card') &&
    !clickTarget.classList.contains('match') &&
    toggledCards.length < 2 &&
    !toggledCards.includes(clickTarget)
  );
}

//Add cards to a list of open cards

var allCards = document.querySelectorAll('.card');
var toggledCards = [];

allCards.forEach(function(card) {
  card.addEventListener('click', function() {
    toggledCards.push(card);
    card.classList.add('open','show');
    if (toggledCards.length === 2) {
        checkforMatch();
    }
  });
});


//Add conditionals to make array length equal to 2
// deck.addEventListener('click', event => {
//   const clickTarget = event.target;
//   if (
//     clickTarget.classList.contains('card')) {
//     toggleCardVar(clickTarget);
//
//   }
// });

let toggleCardVar = function toggleCard (clickTarget){
  clickTarget.classList.toggle('open');
  clickTarget.classList.toggle('show');
}



//Check for match
function checkforMatch() {
  if (
    toggledCards[0].firstElementChild.className ===
    toggledCards[1].firstElementChild.className
  ){
    toggledCards[0].classList.toggle('match');
    toggledCards[1].classList.toggle('match');
    toggledCards = [];
  } else {

    //set timeout
    setTimeout(() => {
      toggleCardVar (toggledCards[0]);
      toggleCardVar (toggledCards[1]);
      toggledCards = [];
    }, 500);
  }
}
//Check score

function checkScore(){
  if (moves === 18 || moves === 24
  ){ removeStar();
    }
}

function hideStar(){
  const starList = document.querySelectorAll('.stars li');
  for (star of starList){
    if (star.style.display !== 'none'){
      star.style.display = 'none';
      break;
    }
  }
}
//hideStar(); // Not working properly, comment it out for now
//hideStar();

//In addition to course materials, I referred to https://matthewcranford.com/memory-game-walkthrough-part-7-making-a-modal/ and Mike Wales' tutorial for Project 2 as provided by Udacity.
//Thanks to my Udacity mentor @Helmuth Breitenfellner and my study buddy @Chase Owens for chcekcing my code. The project is not completed yet, but I'm close.
