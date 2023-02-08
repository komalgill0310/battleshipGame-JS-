document.getElementById("fire-button").addEventListener("click", (e) => {
  e.preventDefault();
  controller.processGuess();
});

let controller = {
  guesses: 0,

  processGuess: function () {
    this.guesses++;
    let location = parseGuess();
    if (location) {
      let hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {
        view.displayMessge(
          `You sank all my battleships, in ${this.guesses} guesses`
        );
        stopGame();
      }
    }
  },
};

function stopGame() {
  document.getElementById("guess-input").disabled = true;
  document.getElementById("fire-button").disabled = true;
  console.log("i will stop the game!");
}

let view = {
  displayMessge: function (msg) {
    document.querySelector(".message-area").innerHTML = msg;
  },
  displayMiss: function (location) {
    document.getElementById(location).classList.add("miss");
    console.log("it is a miss");
  },
  displayHit: function (location) {
    document.getElementById(location).classList.add("hit");
    console.log("it is a hit");
  },
};

const model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,
  ships: [
    {
      locations: ["06", "16", "26"],
      hits: ["", "", ""],
    },
    {
      locations: ["24", "34", "44"],
      hits: ["", "", ""],
    },
    {
      locations: ["10", "11", "12"],
      hits: ["", "", ""],
    },
  ],
  fire: function (location) {
    console.log("location: ", location);
    for (let i = 0; i < this.numShips; i++) {
      let ship = this.ships[i];
      const indexOfLocation = ship.locations.indexOf(location);
      if (indexOfLocation != -1) {
        ship.hits[indexOfLocation] = "hit";
        view.displayHit(location);
        view.displayMessge("HIT");
        if (this.isSunk(ship)) {
          view.displayMessge("You sank my battleship!");
          this.shipsSunk += 1;
        }
        return true;
      }
    }
    view.displayMiss(location);
    view.displayMessge("You missed");
    return false;
  },
  isSunk: function (ship) {
    for (let i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] != "hit") {
        return false;
      }
    }
    return true;
  },
};

function parseGuess() {
  const alphabet = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
  };
  const guessInputValue = document.getElementById("guess-input").value;
  const row = guessInputValue[0].toUpperCase();
  const column = guessInputValue[1];
  if (
    !alphabet.hasOwnProperty(row) ||
    column < 0 ||
    column >= model.boardSize
  ) {
    alert("oops, it does not exist on the board!");
  } else if (column >= 0 && column < model.boardSize) {
    return alphabet[row] + column;
  }
  return null;
}

// let ship2 = ships;
// let locations = ship2[1].locations;
// console.log(locations);

// let ship3 = ships;
// let hits = ship3[2].hits[0];
// if (hits === "hit") {
//   console.log("ouch");
// }

// let ship1 = ships;
// let hits1 = ship1[0].hits[2];
// hits1 = "hit";
// if (hits1 === "hit") {
//   console.log("ship1 got hit");
// }

// view.displayMessge("Hit");
// view.displayMiss("00");
// view.displayMiss("11");
// view.displayMiss("26");
// view.displayMiss("42");
// view.displayMiss("66");
// view.displayHit("06");
// view.displayHit("14");
// view.displayHit("23");
// view.displayHit("33");
// view.displayHit("45");
// view.displayHit("63");

// a = 0, b = 1, c = 2, d = 3, e = 4, f = 5, g = 6

// 06, 13, 24, 31, 10, 34, 50, 01, 26, 11, 12, 44, 16

// hits for ship1: ["hit", hit, hit]

// hits for ship2: [hit, hit, hit]

//hits for ship3: [hit, hit, hit]

//Sharpen your pencil
// 1. 00, 24
// 2. A0, C4
// 3. Yes, Second ship
// 4. No
// 5.

// let ships = [
//   {
//     locations: ["31", "41", "51"],
//     hits: ["", "", ""],
//   },
//   {
//     locations: ["14", "24", "34"],
//     hits: ["", "hit", ""],
//   },
//   {
//     locations: ["00", "01", "02"],
//     hits: ["hit", "", ""],
//   },
// ];
