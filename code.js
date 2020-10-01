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

let count = 0;

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
  resetGame();
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
  let count = 1; // Be the new token

  let nums = token.split("-"); // Pos on Grid
  let tokenArr = nums.map(Number);
  // PlayerArr upon the DropToken V
  if (
    (playerArr.includes(tokenArr[0] + 1 + "-" + tokenArr[1]) &&
      tokenArr[0] + 1 < 7) ||
    playerArr.includes(tokenArr[0] - 1 + "-" + tokenArr[1])
  ) {
    let fCount = 0;
    fCount += horizonCheck(tokenArr);
    if (fCount < 3) {
      fCount = 0;
    }
    count += fCount;
  }

  if (
    (playerArr.includes(tokenArr[0] + "-" + (tokenArr[1] + 1)) &&
      tokenArr[1] + 1 < 6) ||
    playerArr.includes(tokenArr[0] + "-" + (tokenArr[1] - 1))
  ) {
    let fCount = 0;
    fCount += vertCheck(tokenArr);
    if (fCount < 3) {
      fCount = 0;
    }
    count += fCount;
  }

  if (
    (playerArr.includes(tokenArr[0] + 1 + "-" + (tokenArr[1] + 1)) &&
      tokenArr[1] + 1 < 6) ||
    playerArr.includes(tokenArr[0] - 1 + "-" + (tokenArr[1] - 1))
  ) {
    let fCount = 0;
    fCount += diaLeftCheck(tokenArr);
    if (fCount < 3) {
      fCount = 0;
    }
    count += fCount;
  }

  if (
    (playerArr.includes(tokenArr[0] + 1 + "-" + (tokenArr[1] - 1)) &&
      tokenArr[1] + 1 < 6) ||
    playerArr.includes(tokenArr[0] - 1 + "-" + (tokenArr[1] + 1))
  ) {
    let fCount = 0;
    fCount += diaRightCheck(tokenArr);
    if (fCount < 3) {
      fCount = 0;
    }
    count += fCount;
  }

  if (count === 4) {
    return true;
  } else {
    return false;
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

function gameOver() {
  boardArr.push(count);
  let result = "";
  if (boardArrCount.length === 42) {
    // or (redPlayer [] === blackPlayer [])
    result = `Tie`;
  }
  if (gameCheck(playerArr[playerArr.length - 1])) {
    result = selectedPlayer + " won";
  }
  document.getElementById("output").innerHTML;
}

function resetGame() {
  selectedPlayer = "red";

  redPlayer = [];
  blackPlayer = [];
  playerArr = [];
  let col = document.getElementsByClassName("token");
  for (let i = 0; i < col.length; i++) {
    col[i].style.background = "white";
  }
}

/* 

playerArr = [i, j, k]

redArr => playArr = [i, j, k]

playerArr => blackArr = []

*/
const clickHandler = function(event) {
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
/*const clickHandler = function(event) {
  if (gameStatus == true) {
      const selectedCol = event.currentTarget
      dropToken(selectedCol, boardModel, currentPlayer)
      const winner = isGameOver(boardModel)
      if (winner !== null) {
          winMessage(winner);
          gameStatus = false;
      } else if (gameIsATie(boardModel)) {
          TieMessage();
          gameStatus = false;
      } else {
          displayCurrentPlayer(currentPlayer);
      }
  }
}


function clickHandler(event) {
  const tokenID = event.target.getAttribute("id");
  if (!tokenID) {
    return;
  }
  if (checkFull(tokenID[0])) {
    return;
  }
  console.log(tokenID[0]);
  playerToggle();
}

function checkFull(num) {
  let fullCol = [];
  let gameCol = document.getElementsByClassName("col" + num);
  for (let i = 0; i < 6; i++) {
    if (gameCol[i].style.backgroundColor != "white") {
      fullCol.push(gameCol[i]);
    }
  }
  if (fullCol.length === gameCol.length) {
    return true;
  } else {
    return false;
  }
}
*/

function initializer() {
  let col = document.getElementsByClassName("columns");

  for (let i = 0; i < 7; i++) {
    col[i].addEventListener("click", clickHandler);
  }
}

drawBoard();
initializer();

// Unit Test

function testGameCheck() {
  playerArr = ["6-5", "6-3", "6-4", "6-2"];

  let result = gameCheck(playerArr[playerArr.length - 1]);
  console.assert(
    result === true,
    JSON.stringify({
      function: "gameCheck(playerArr[playerArr.length-1])",
      expected: true,
      result: result,
    })
  );

  playerArr = ["5-0", "4-0", "3-0", "2-1", "2-0"];

  result = gameCheck(playerArr[playerArr.length - 1]);
  console.assert(
    result === true,
    JSON.stringify({
      function: "gameCheck(playerArr[playerArr.length-1])",
      expected: true,
      result: result,
    })
  );

  playerArr = ["5-2", "3-3", "4-2", "5-1", "6-0"];

  result = gameCheck(playerArr[playerArr.length - 1]);
  console.assert(
    result === true,
    JSON.stringify({
      function: "gameCheck(playerArr[playerArr.length-1])",
      expected: true,
      result: result,
    })
  );

  playerArr = ["5-0", "4-3", "3-2", "2-1", "1-0"];

  result = gameCheck(playerArr[playerArr.length - 1]);
  console.assert(
    result === true,
    JSON.stringify({
      function: "gameCheck(playerArr[playerArr.length-1])",
      expected: true,
      result: result,
    })
  );

  playerArr = [];
}

testGameCheck();
