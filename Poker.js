
var hands = [
  "4 of a Kind",
  "Straight Flush",
  "Straight",
  "Flush",
  "High Card",
  "1 Pair",
  "2 Pair",
  "Royal Flush",
  "3 of a Kind",
  "Full House",
];
let KIND = 0;
let SF = 0;
let S = 0;
let F = 0;
let oneP = 0;
let twoP = 0;
let HG = 0;
let RF = 0;
let threeKind = 0;
let FH = 0;
var suits = { "♠": 1, "♣": 2, "♥": 4, "♦": 8 };
let CardSuits = [];
let Card = [];
j = 0;
const data = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function pokerGame() {
  while (j < 1000) {
    for (let i = 0; i < 5; i++) {
      let card = data[Math.floor(Math.random() * 13)];
      let cardType = Math.floor(Math.random() * 4);
      Card.push(card);
      CardSuits.push(suits[Object.keys(suits)[cardType]]);
    }
    check(Card, CardSuits);
    CardSuits = [];
    Card = [];
    j++;
  }
  console.log("Loop: " + j);
  console.log("High Card: " + HG);
  console.log("4 of a Kind: " + KIND);
  console.log("Straight Flush: " + SF);
  console.log("Flush: " + F);
  console.log("Straight: " + S);
  console.log("1 Pair: " + oneP);
  console.log("2 Pair: " + twoP);
  console.log("Royal Flush: " + RF);
  console.log("3 of a Kind: " + threeKind);
  console.log("Full House: " + FH);
}

function check(number, cardType) {
  var v,
    i,
    o,
    s =
      (1 << number[0]) |
      (1 << number[1]) |
      (1 << number[2]) |
      (1 << number[3]) |
      (1 << number[4]);
  for (i = -1, v = o = 0; i < 5; i++, o = Math.pow(2, number[i] * 4)) {
    v += o * (((v / o) & 15) + 1);
  }
  v = (v % 15) - (s / (s & -s) == 31 || s == 16444 ? 3 : 1);
  v -=
    (cardType[0] == (cardType[1] | cardType[2] | cardType[3] | cardType[4])) *
    (s == 31744 ? -5 : 1);
  const result = hands[v] + (s == 16444 ? " (Ace low)" : "");
  if (result == "High Card") {
    HG += 1;
  } else if (result == "4 of a Kind") {
    KIND += 1;
  } else if (result == "Straight Flush") {
    SF += 1;
  } else if (result == "Straight") {
    S += 1;
  } else if (result == "Flush") {
    F += 1;
  } else if (result == "1 Pair") {
    oneP += 1;
  } else if (result == "2 Pair") {
    twoP += 1;
  } else if (result == "Royal Flush") {
    RF += 1;
  } else if (result == "3 of a Kind") {
    threeKind += 1;
  } else if (result == "Full House") {
    FH += 1;
  }
}

pokerGame();
