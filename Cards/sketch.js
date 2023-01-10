let img;
let xdif;
let ydif;

let deck = [];

let playerDeck = [];
let aiDeck = [];
let symbols = [];

let pick = 0;

let turn = 'player';
let again = true;

function preload() {
  img = loadImage('PNG-cards-1.3/clubs.png');
}
function setup() {
  createCanvas(3000, 1500);
  for (let i = 2; i < 11; i++) {
    deck.push(new Card('PNG-cards-1.3/' + i.toString() + '_of_clubs.png', i, 'clubs'))
  }
  deck.push(new Card('PNG-cards-1.3/jack_of_clubs2.png', 11, 'clubs'));
  deck.push(new Card('PNG-cards-1.3/queen_of_clubs2.png', 12, 'clubs'));
  deck.push(new Card('PNG-cards-1.3/king_of_clubs2.png', 13, 'clubs'));
  deck.push(new Card('PNG-cards-1.3/ace_of_clubs.png', 14, 'clubs'));
  for (let i = 2; i < 11; i++) {
    deck.push(new Card('PNG-cards-1.3/' + i.toString() + '_of_hearts.png', i, 'hearts'))
  }
  deck.push(new Card('PNG-cards-1.3/jack_of_hearts2.png', 11, 'hearts'));
  deck.push(new Card('PNG-cards-1.3/queen_of_hearts2.png', 12, 'hearts'));
  deck.push(new Card('PNG-cards-1.3/king_of_hearts2.png', 13, 'hearts'));
  deck.push(new Card('PNG-cards-1.3/ace_of_hearts.png', 14, 'hearts'));
  for (let i = 2; i < 11; i++) {
    deck.push(new Card('PNG-cards-1.3/' + i.toString() + '_of_diamonds.png', i, 'diamonds'))
  }
  deck.push(new Card('PNG-cards-1.3/jack_of_diamonds2.png', 11, 'diamonds'));
  deck.push(new Card('PNG-cards-1.3/queen_of_diamonds2.png', 12, 'diamonds'));
  deck.push(new Card('PNG-cards-1.3/king_of_diamonds2.png', 13, 'diamonds'));
  deck.push(new Card('PNG-cards-1.3/ace_of_diamonds.png', 14, 'diamonds'));
  for (let i = 2; i < 11; i++) {
    deck.push(new Card('PNG-cards-1.3/' + i.toString() + '_of_spades.png', i, 'spades'))
  }
  deck.push(new Card('PNG-cards-1.3/jack_of_spades2.png', 11, 'spades'));
  deck.push(new Card('PNG-cards-1.3/queen_of_spades2.png', 12, 'spades'));
  deck.push(new Card('PNG-cards-1.3/king_of_spades2.png', 13, 'spades'));
  deck.push(new Card('PNG-cards-1.3/ace_of_spades2.png', 14, 'spades'));

  swap(deck);

  for (let i = deck.length - 1; i >= 0; i--) {
    if (i % 2 === 0) {
      playerDeck.push(deck.splice(i, 1)[0]);
    } else {
      aiDeck.push(deck.splice(i, 1)[0]);
    }
    if (playerDeck.length === 7 && aiDeck.length === 7) {
      break;
    }
  }

  for (let card of deck) {
    card.x = 1500 - card.width / 2 + card.width + 5;
    card.y = 750 - card.height / 2;
  }
  deck[deck.length - 1].x = 1500 - deck[deck.length - 1].width / 2;
  deck[deck.length - 1].front = true;

  let num = 0;
  for (let card of playerDeck) {
    card.x = num * (card.width + 5) + 100;
    card.y = 1200;
    card.front = true;
    card.neverfollow = false;
    num++;
  }

  num = 0;
  for (let card of aiDeck) {
    card.x = num * (card.width + 5) + 100;
    card.y = 100;
    num++;
  }
  // for (let i = 0; i < 4; i++) {
  //   for (let j = 0; j < 13; j++) {
  //     deck[i * 13 + j].x = 205 * j + 5;
  //     deck[i * 13 + j].y = i * 295 + 5;
  //     deck[i * 13 + j].show();
  //   }
  // }
}

function draw() {
  background(0);




  for (let card of deck) {
    card.show();
  }

  for (let card of playerDeck) {
    card.show();

    if (card.follow && !card.neverfollow) {
      card.x = mouseX - xdif;
      card.y = mouseY - ydif;
    }
  }

  for (let card of aiDeck) {
    card.show();
  }

  for (let sym of symbols) {
    sym.show();
  }

}

function ai() {
  turn = 'player';
  let possible = [];
  let played = false;
  for (let card of aiDeck) {
    if (deck[deck.length - 1].value === 2 && pick !== 0) {
      if (card.value === 2) {
        possible.push(card);
      }
    } else if (card.value === deck[deck.length - 1].value || card.symbol === deck[deck.length - 1].symbol || card.value === 11) {
      possible.push(card);
    }
  }
  if (possible.length === 0 && deck[deck.length - 1].value === 2) {
    for (let i = 0; i < pick; i++) {
      aiDeck.push(deck.shift());
    }
    pick = 0;
  } else if (possible.length === 0) {
    aiDeck.push(deck.shift());
    if (aiDeck[aiDeck.length - 1].value === deck[deck.length - 1].value || aiDeck[aiDeck.length - 1].symbol === deck[deck.length - 1].symbol || aiDeck[aiDeck.length - 1].value === 11) {
      let card = aiDeck[aiDeck.length - 1];
      card.x = 1500 - card.width / 2;
      card.y = 750 - card.height / 2;
      card.front = true;
      played = true;
      for (let i = 0; i < aiDeck.length; i++) {
        if (card === aiDeck[i]) {
          deck.push(aiDeck.splice(i, 1)[0]);
        }
      }
    }
  }
  for (let card of possible) {
    if (card.value === 2) {
      pick += 2;
      card.x = 1500 - card.width / 2;
      card.y = 750 - card.height / 2;
      card.front = true;
      for (let i = 0; i < aiDeck.length; i++) {
        if (card === aiDeck[i]) {
          deck.push(aiDeck.splice(i, 1)[0]);
        }
      }
      played = true;
      break;
    } else if (card.value === 7) {
      turn = 'ai';
      card.x = 1500 - card.width / 2;
      card.y = 750 - card.height / 2;
      card.front = true;
      for (let i = 0; i < aiDeck.length; i++) {
        if (card === aiDeck[i]) {
          deck.push(aiDeck.splice(i, 1)[0]);
        }
      }
      played = true;
      break;
    } else if (card.value === 8) {
      turn = 'ai';
      card.x = 1500 - card.width / 2;
      card.y = 750 - card.height / 2;
      card.front = true;
      for (let i = 0; i < aiDeck.length; i++) {
        if (card === aiDeck[i]) {
          deck.push(aiDeck.splice(i, 1)[0]);
        }
      }
      played = true;
      break;
    } else if (card.value === 11) {
      let clubs = 0;
      let hearts = 0;
      let diamonds = 0;
      let spades = 0;
      for (let card2 of aiDeck) {
        if (card.symbol === 'clubs') {
          clubs++;
        } else if (card.symbol === 'hearts') {
          hearts++;
        } else if (card.symbol === 'diamonds') {
          diamonds++;
        } else if (card.symbol === 'spades') {
          spades++;
        }
      }
      if (clubs >= hearts && clubs >= diamonds && clubs >= spades) {
        card.symbol = 'clubs';
      } else if (hearts >= clubs && hearts >= diamonds && hearts >= spades) {
        card.symbol = 'hearts';
      } else if (diamonds >= clubs && diamonds >= hearts && diamonds >= spades) {
        card.symbol = 'diamonds';
      } else {
        card.symbol = 'spades';
      }
      card.x = 1500 - card.width / 2;
      card.y = 750 - card.height / 2;
      card.front = true;
      for (let i = 0; i < aiDeck.length; i++) {
        if (card === aiDeck[i]) {
          deck.push(aiDeck.splice(i, 1)[0]);
        }
      }
      played = true;
      break;
    }
  }
  for (let card of possible) {
    if (played) {
      break;
    }
    card.x = 1500 - card.width / 2;
    card.y = 750 - card.height / 2;
    card.front = true;
    played = true;
    for (let i = 0; i < aiDeck.length; i++) {
      if (card === aiDeck[i]) {
        deck.push(aiDeck.splice(i, 1)[0]);
      }
    }
    break;
  }
  possible = [];

  again = true;

  let num = 0;
  for (let card of aiDeck) {
    card.x = num * (card.width + 5) + 100;
    card.y = 100;
    num++;
  }

  if (turn === 'ai' && again) {
    turn = '';
    again = false;
    sleep(2000).then(function() {ai();});
  }
}

function mousePressed() {
  for (let i = playerDeck.length - 1; i >= 0; i--) {
    if (playerDeck[i].hits(mouseX, mouseY)) {
      xdif = mouseX - playerDeck[i].x;
      ydif = mouseY - playerDeck[i].y;
      playerDeck[i].follow = true;
      let card = playerDeck[i];
      playerDeck.splice(i, 1);
      playerDeck.push(card);
      break;
    }
  }

  for (sym of symbols) {
    if (sym.hits(mouseX, mouseY)) {
      deck[deck.length - 1].symbol = sym.symbol;
      symbols = [];
      turn = 'ai';
      break;
    }
  }
}

function swap(grid) {
  let swap1;
  let swap2;
  let x;
  let y;
  for (let i = 0; i < deck.length; i++) {
      swap1 = grid[i];
      index = round(random(deck.length - 1));
      swap2 = grid[index];
      grid[i] = swap2;
      grid[index] = swap1;
  }
}

function mouseReleased() {
  let able = false;
  if (deck[deck.length - 1].value === 2 && pick !== 0) {
    for (let card of playerDeck) {
      if (card.value === 2) {
        able = true;
      }
    }
    if (!able && turn === 'player') {
      for (let i = 0; i < pick; i++) {
        deck[0].x = -400;
        playerDeck.push(deck.shift());
      }
      pick = 0;
      turn = 'ai';
    }
  } else {
    for (let card of playerDeck) {
      if (card.value === deck[deck.length - 1].value || card.symbol === deck[deck.length - 1].symbol || card.value === 11) {
        able = true;
        break;
      }
    }

    if (!able && turn === 'player') {
      deck[0].x = -400;
      playerDeck.push(deck.shift());
      let card = playerDeck[playerDeck.length - 1];
      if (card.value === deck[deck.length - 1].value || card.symbol === deck[deck.length - 1].symbol || card.value === 11) {
      } else {
        turn = 'ai';
      }
    }
  }


  for (let i = 0; i < playerDeck.length; i++) {
    let card = playerDeck[i];
    card.follow = false;
    if ((card.y + card.height / 2 > 750 - card.height) && (card.y + card.height / 2 < 750 + card.height) && turn === 'player') {
      if ((card.x + card.width / 2 > 1500 - card.width) && (card.x + card.width / 2 < 1500 + card.width)) {
        if (deck[deck.length - 1].value === 2 && pick !== 0) {
          if (card.value === 2) {
            pick += 2;
            turn = 'ai';
            card.x = 1500 - card.width / 2;
            card.y = 750 - card.height / 2;
            card.neverfollow = true;
            card.front = true;
            deck.push(playerDeck.splice(i, 1)[0]);
          }
        } else if (card.value === deck[deck.length - 1].value || card.symbol === deck[deck.length - 1].symbol || card.value === 11) {
          turn = 'ai';
          card.x = 1500 - card.width / 2;
          card.y = 750 - card.height / 2;
          card.neverfollow = true;
          card.front = true;
          deck.push(playerDeck.splice(i, 1)[0]);
          if (card.value === 11) {
            symbols.push(new Symboll('PNG-cards-1.3/clubs.png', 'clubs', 1400, 680));
            symbols.push(new Symboll('PNG-cards-1.3/hearts.png', 'hearts', 1550, 680));
            symbols.push(new Symboll('PNG-cards-1.3/diamonds.png', 'diamonds', 1400, 830));
            symbols.push(new Symboll('PNG-cards-1.3/spades.png', 'spades', 1550, 830));
            turn = 'player';
          } else if (card.value === 2) {
            pick += 2;
          } else if (card.value === 7) {
            turn = 'player';
          } else if (card.value === 8) {
            turn = 'player';
          }
        }
      }
    }
  }
  if (turn === 'ai' && again) {
    turn = '';
    again = false;
    sleep(2000).then(function() {ai();});
  }

  let num = 0;
  for (let card of playerDeck) {
    card.x = num * (card.width + 5) + 100;
    card.y = 1200;
    card.front = true;
    card.neverfollow = false;
    num++;
  }
}

function sleep(millisecondsDuration)
{
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}
