//Check for previous highscore, and replace if exists
let scoreBoard = document.querySelector('h2');
let storedScore = '';
let highScore = document.getElementById('highScore')
if (JSON.parse(localStorage.getItem('score')) !== null){
  storedScore = JSON.parse(localStorage.getItem('score'));
  highScore.innerText = `High Score: ${storedScore}`;
}


const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "brown",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "brown"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.style.backgroundColor = 'black'

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
let numPicked = 0;
let firstCard =  ''
let gameEnd = 0;
let clicks = 0;


function handleCardClick(event) {
  if(gameStart === true){
  numPicked++;
  if(numPicked === 1) {
    clicks++;
    firstCard = event.target;
    firstCard.style.backgroundColor = firstCard.className;
  }
  if(numPicked === 2) {

    clicks++;
    scoreBoard.innerText = `Score : ${clicks/2}`;
    let secondCard = event.target;
    secondCard.style.backgroundColor = secondCard.className;
    
    //win condition
    setTimeout(function(){
    if(firstCard.className === secondCard.className && firstCard !== secondCard){
      gameEnd+=2;
    }
    else {
      
      firstCard.style.backgroundColor = 'black'
      secondCard.style.backgroundColor = 'black'
    }
      if (gameEnd === COLORS.length) {
        //I am not considering each click an attempt, but each color compare an attempt
        console.log(`YOU WON!!! it took ${Math.ceil(clicks/2)} attempts`);
        if (Math.ceil(clicks/2) < storedScore || storedScore === ''){
          highScore.innerText = `High Score: ${Math.ceil(clicks/2)}`;
          localStorage.setItem('score',JSON.stringify(Math.ceil(clicks/2)));
        }
        btn.innerText = 'Start'
        gameStart = false;
       
    }

    numPicked = 0;
  },1000);
  }
  }
}

//Create start button
let gameStart = false;
let btn = document.querySelector('button')
btn.addEventListener('click', function(e) {
  if(gameStart === false || gameEnd === COLORS.length){
  gameStart = true;
  
  }

  //Turn start button into reset button
  if(gameStart === true){
    btn.innerText = 'Reset'
    scoreBoard.innerText = 'Score: --';
    for (let i = 0; i < eleCard.length; i++) eleCard[i].style.backgroundColor = 'black';
    numPicked = 0;
    firstCard =  '';
    gameEnd = 0;
    clicks = 0;
    gameStart = true;
  }
})


// when the DOM loads
createDivsForColors(shuffledColors);
let eleCard = gameContainer.querySelectorAll('div');


/* */