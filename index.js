const model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,
  ships: [
    {
      locations: [0, 0, 0],
      hits: ["", "", ""],
    },
    {
      locations: [0, 0, 0],
      hits: ["", "", ""],
    },
    {
      locations: [0, 0, 0],
      hits: ["", "", ""],
    },
  ],
  fire: function (location) {
    for (let i = 0; i < this.numShips; i++) {
      let ship = this.ships[i];
      const indexOfLocation = ship.locations.indexOf(location);
      if (ship.hits[indexOfLocation] === "hit") {
        view.displayMessge("oops, you already hit that location!");
        return true;
      } else if (indexOfLocation != -1) {
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
  generateShipLocations: function () {
    let shipLocations;
    for (let i = 0; i < this.numShips; i++) {
      do {
        shipLocations = this.generateShip();
      } while (this.collision(shipLocations));
      this.ships[i].locations = shipLocations;
    }
  },
  generateShip: function () {
    let direction = Math.floor(Math.random() * 2);
    let row, col;
    if (direction === 1) {
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
    } else {
      row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
      col = Math.floor(Math.random() * this.boardSize);
    }
    let newShipLocations = [];
    for (let i = 0; i < this.shipLength; i++) {
      if (direction === 1) {
        newShipLocations.push(`${row}${col + i}`);
      } else {
        newShipLocations.push(`${row + i}${col}`);
      }
    }
    return newShipLocations;
  },
  collision: function (locations) {
    for (let i = 0; i < this.numShips; i++) {
      let ship = model.ships[i];
      for (let j = 0; j < locations.length; j++) {
        if (ship.locations.includes(locations[j])) {
          return true;
        }
      }
    }
    return false;
  },
};

let view = {
  displayMessge: function (msg) {
    document.querySelector(".message-area").innerHTML = msg;
  },
  displayMiss: function (location) {
    document.getElementById(location).classList.add("miss");
  },
  displayHit: function (location) {
    document.getElementById(location).classList.add("hit");
  },
};

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

init();

function init() {
  let fireButton = document.getElementById("fire-button");
  fireButton.onclick = handleFireButton;
  document.getElementById("guess-input").onkeydown = handleKeyDown;

  model.generateShipLocations();
}

function handleFireButton() {
  controller.processGuess();
  document.getElementById("guess-input").value = "";
}

function handleKeyDown(e) {
  if (e.keyCode === 13) {
    document.getElementById("fire-button").click();
    return false;
  }
}

function stopGame() {
  document.getElementById("guess-input").disabled = true;
  document.getElementById("fire-button").disabled = true;
}

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
  const row = document.getElementById("guess-input").value[0].toUpperCase();
  const column = document.getElementById("guess-input").value[1];
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

// 1. Handler✅
// 2. Attributes❌ => Set Attribute
// 3. object✅
// 4. ClassLists❌ => Background
// 5. Controller✅
// 6. dowhile✅
// 7. Hit✅
// 8. JavaScript✅
// 9. indexOf✅
// 10. Arrays ❌=> Object
// 11. Cell✅
// 12. Collide ❌=> Overlap
// 13. View✅
// 14. RETURN
// 15. View ❌=> Fire
// 16. Model✅
// 17. Model✅
// 18. Console✅
