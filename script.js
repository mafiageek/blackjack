
var createDeck = function() {
  var cardDeckSuit = ['♥️', '♦️', '♣️', '♠️'];
  var cardDeck = [];
  for (var i = 0; i < cardDeckSuit.length; i++) {
      for(var j = 1; j < 14; j++) {
          var cardName = j;
          var rankCounter = j;
          var suit = cardDeckSuit[i];

          if (cardName == 1) {
              cardName = 'ace';
            } else if (cardName == 11) {
              cardName = 'jack';
            } else if (cardName == 12) {
              cardName = 'queen';
            } else if (cardName == 13) {
              cardName = 'king';
            }

          if (rankCounter == 11 || rankCounter == 12 || rankCounter == 13) {
            rankCounter = 10;
          }

          var card = {
              name: cardName,
              suit: suit,
              rank: rankCounter,
            };

          cardDeck.push(card);
      }
  }

  return cardDeck;

}

var shuffleCards = function(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      let temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
  }

  return deck;
}

var dealCard = function (cardArr) {
  cardArr.push(shuffledDeck.pop());
};

var playingCards = createDeck();
var shuffledDeck = shuffleCards(playingCards);
var playerChips = 100;
var playerWins = 0;
var computerWins = 0;
var computerCardArr = [];
var playerCardArr = [];
// Test Input
// var playerCardArr = [
//   {name: 'queen', suit: '♠️', rank: 10},
//   {name: 'ace', suit: '♦️', rank: 1}
// ];


var containAce = function (cardArr) {
  let output = '';
  for (let i = 0; i < cardArr.length; i++) {
    if(cardArr[i].name == "ace") {
      output = true;
      break;
    }
  } 
  return output;
}

var isBlackJack = function (cardArr) {
  let totalPoints = cardArrSum(cardArr);
  let ace = containAce(cardArr);
  // console.log("total points", totalPoints);
  // console.log("has ace", ace);
    return cardArr.length == 2 &&  totalPoints == 11 && ace === true;  
}

var cardArrSum = function (cardArr) {
  let output = 0;
  for (let i = 0; i < cardArr.length; i++) {
    output += cardArr[i].rank;
  }
  return output;
}


var determineWinner = function () {
  let winner = '';

  if (isBlackJack(playerCardArr)) {
    winner = "Player";
    return winner;
  }

  if (isBlackJack(computerCardArr)) {
    winner = "Computer"
    return winner;
  }

  if (cardArrSum(playerCardArr) > 21) {
    winner = "Computer"
    return winner;
  }
  
  while(cardArrSum(computerCardArr) < 17) {
    dealCard(computerCardArr);
  }

  if (cardArrSum(computerCardArr) > 21) {
    winner = "Player"
    return winner;
  }

  if (cardArrSum(playerCardArr) > cardArrSum(computerCardArr)) {
    winner = "Player";
  } else if ((cardArrSum(playerCardArr) < cardArrSum(computerCardArr))) { 
    winner = "Computer";
  } else {
    winner = "No one"
  }

  return winner;

}

const showCards = function (cardArr) {
  let myOutputValue = '';
  for(let i = 0; i < cardArr.length; i++) {
    myOutputValue += `
    ${cardArr[i].name} of ${cardArr[i].suit} <br>
    `
  }
    return myOutputValue;
}

// play
var main = function (input) {
var myOutputValue = '';

for(var i = 0; i < 2; i++) {  
  dealCard(playerCardArr);
  dealCard(computerCardArr);
}
  myOutputValue += `Player hand: ${showCards(playerCardArr)}`;
  return myOutputValue;
};

// hit
const hit = function() {
  var myOutputValue = '';
  dealCard(playerCardArr);
  for(var i = 0; i < playerCardArr.length; i++) {
    myOutputValue += `
    ${playerCardArr[i].name} of ${playerCardArr[i].suit} <br>
    `
  }
  return `Player hand: ${myOutputValue}`;
}

// stay
const stay = function(input) {
  var myOutputValue = '';
  let winner = determineWinner();
  if (winner == "Player") {
    playerChips += 10;
    playerWins += 1;
  } else if (winner == "Computer"){
    playerChips -= 10;
    computerWins += 1;
  }
  myOutputValue += `${winner} won <br>`;
  myOutputValue += `Player hand: ${showCards(playerCardArr)}`;
  myOutputValue += `Computer hand: ${showCards(computerCardArr)}`;
  console.log(playerCardArr);
  console.log(computerCardArr);
  playerCardArr = [];
  computerCardArr = [];
  playingCards = createDeck();
  shuffledDeck = shuffleCards(playingCards);
  return myOutputValue;
}