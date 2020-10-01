/*    
    *Track the tokens
    -If they reach 42
    -More than 6 in the col
    
    *Place tokens
    -insert the token into the grid
    -find the smallest value in col
    -Token's array location goes into a player's array
    
    !gameChecks - mini Functions
    -Determines if there's is four in a row
    -Potentially flood fill ali
    -Checks selectedPlayer Array if there's any connected 4
    -if the token placed is in the center, is that needs to check 1 above
    
    clickHandlers*
        
        [1]2
        
        1 [ 0, 1, 2, 3, 4, 5 ]
        2 [ 0, 1, 2, 3, 4, 5 ]
        3 [ 0, 1, 2, 3, 4, 5 ]
        4 [ 0, 1, 2, 3, 4, 5 ]
        5 [ 0, 1, 2, 3, 4, 5 ]
        */

let selectedPlayer = "red";

let redPlayer = [],
  blackPlayer = [],
  playerArr = [],
  boardArr = [];

function twoArray() {
  let arr = new Array(7);
  for (let i = 0; i < 7; i++) {
    arr[i] = new Array(6);
  }

  return arr;
}

function drawBoard() {
  let gameDiv = document.getElementById("board");

  boardArr = twoArray();

  for (let col = 0; col < boardArr.length; col++) {
    let gameCol = document.createElement("div");
    gameCol.classList.add("columns");
    for (let row = 0; row < 6; row++) {
      let cell = document.createElement("div");
      cell.classList.add("token");
      cell.classList.add("col" + col);
      cell.setAttribute("id", col + "-" + row);

      gameCol.append(cell);
    }
    gameDiv.append(gameCol);
  }
}

function playerToggle() {
  if (selectedPlayer === "red") {
    redPlayer = playerArr;
    selectedPlayer = "black";
    playerArr = blackPlayer;
  } else if (selectedPlayer === "black") {
    blackPlayer = playerArr;
    selectedPlayer = "red";
    playerArr = redPlayer;
  }
}

function gameCheck(token) {
  let count = 1;

  let nums = token.split("-");
  let tokenArr = nums.map(Number);

  if (
    (playerArr.includes(tokenArr[0] + 1 + "-" + tokenArr[1]) &&
      tokenArr[0] + 1 < 7) ||
    playerArr.includes(tokenArr[0] - 1 + "-" + tokenArr[1])
  ) {
    count += horizonCheck(tokenArr);
  } else if (
    (playerArr.includes(tokenArr[0] + "-" + (tokenArr[1] + 1)) &&
      tokenArr[1] + 1 < 6) ||
    playerArr.includes(tokenArr[0] + "-" + (tokenArr[1] - 1))
  ) {
    count += vertCheck(tokenArr);
  } else if (
    (playerArr.includes(tokenArr[0] + 1 + "-" + (tokenArr[1] + 1)) &&
      tokenArr[1] + 1 < 6) ||
    playerArr.includes(tokenArr[0] - 1 + "-" + (tokenArr[1] - 1))
  ) {
    count += diaLeftCheck(tokenArr);
  } else if (
    (playerArr.includes(tokenArr[0] + 1 + "-" + (tokenArr[1] - 1)) &&
      tokenArr[1] + 1 < 6) ||
    playerArr.includes(tokenArr[0] - 1 + "-" + (tokenArr[1] + 1))
  ) {
    count += diaRightCheck(tokenArr);
  }

  if (count >= 4) {
    console.log(count);
    gameOver();
  } else {
    return;
  }
}

function diaLeftCheck(direction) {
  let count = 0;
  for (let i = 1; i <= 3; i++) {
    if (playerArr.includes(direction[0] + i + "-" + (direction[1] + i))) {
      count++;
    }
  }

  for (let i = -1; i >= -3; i--) {
    if (playerArr.includes(direction[0] + i + "-" + (direction[1] - i))) {
      count++;
    }
  }
  return count;
}
function diaRightCheck(direction) {
  let count = 0;
  for (let i = 1; i <= 3; i++) {
    if (playerArr.includes(direction[0] + i + "-" + (direction[1] - i))) {
      count++;
    }
  }

  for (let i = -1; i >= -3; i--) {
    if (playerArr.includes(direction[0] + i + "-" + (direction[1] - i))) {
      count++;
    }
  }

  return count;
}
function horizonCheck(direction) {
  let count = 0;
  for (let i = 1; i <= 3; i++) {
    if (playerArr.includes(direction[0] + i + "-" + direction[1])) {
      count++;
    }
  }

  for (let i = -1; i >= -3; i--) {
    if (playerArr.includes(direction[0] + i + "-" + direction[1])) {
      count++;
    }
  }

  return count;
}
function vertCheck(direction) {
  let count = 0;
  for (let i = 1; i <= 3; i++) {
    if (playerArr.includes(direction[0] + "-" + (direction[1] + i))) {
      count++;
    }
  }

  for (let i = -1; i >= -3; i--) {
    if (playerArr.includes(direction[0] + "-" + (direction[1] + i))) {
      count++;
    }
  }

  return count;
}
let count = 0;
function gameOver() {
  for (i = 0; i < boardArr.length; i++) {
    count++;
    boardArr.push(count);
    if (boardArrCount === 42) {
      // or (redPlayer [] === blackPlayer [])
      return `game over`;
    }
    if (gameCheck(playerArr[playerArr.length - 1])) {
      alert(selectedPlayer + " won");
    }
  }
}

function gameOver(currentPlayer) {
  gameIsActive = false;
  document.getElementById("output").innerHTML = currentPlayer + " won";
}
const dropToken = function () {
  for (row = 5; row >= 0; row--) {
    if ((gameDiv[row][col] = 0));
    {
      gameDiv[row][col] = selectedPlayer;
      drawBoard();
      if (selectedPlayer == 1) {
        selectedPlayer == 2;
      } else {
        selectedPlayer == 1;
      }
      playerToggle();
      return true;
    }
  }
};

/* 

playerArr = [i, j, k]

redArr => playArr = [i, j, k]

playerArr => blackArr = []

*/

function clickHandler(event) {
  const selectedColumn = event.currentTarget;
  console.log(selectedColumn);
  if (columnIsFull(selectedColumn)) {
    document.getElementById("output").innerHTML = "Game Over!";
  } else {
    dropToken(selectedColumn);
  }
  if (gameOver()) {
    document.getElementById("output").innerHTML = "Game Over!";
  } else {
    playerToggle();
    dropToken(selectedCol);
  }
}

function initializer() {
  let col = document.getElementsByClassName("columns");

  for (let i = 0; i < 7; i++) {
    col[i].addEventListener("click", clickHandler);
  }
}

drawBoard();
initializer();
