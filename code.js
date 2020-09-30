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

  for (let row = 0; row < boardArr.length; row++) {
    let gameRow = document.createElement("div");
    for (let col = 0; col < 6; col++) {
      let cell = document.createElement("div");
      cell.classList.add("token");
      cell.classList.add("col" + row);

      gameRow.append(cell);
    }
    gameDiv.append(gameRow);
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

/* 

playerArr = [i, j, k]

redArr => playArr = [i, j, k]

playerArr => blackArr = []

*/
function gameOver() {}

function clickHandler(event) {
  const selectedColumn = event.currentTarget;
  if (columnIsFull(selectedColumn)) {
    txt = "column full";
  } else {
    dropToken(selectedColumn);
  }
  // if (winningCombination) {
  //   txt = "&#128516";
  // if ()
  // }
  if (gameOver()) {
    alert("game over");
  } else {
    playerToggle();
  }
}

function initializer() {
  drawBoard();

  document.querySelector(".col0").addEventListener("click", clickHandler);

  document.querySelector(".col1").addEventListener("click", clickHandler);

  document.querySelector(".col2").addEventListener("click", clickHandler);

  document.querySelector(".col3").addEventListener("click", clickHandler);

  document.querySelector(".col4").addEventListener("click", clickHandler);

  document.querySelector(".col5").addEventListener("click", clickHandler);

  document.querySelector(".col6").addEventListener("click", clickHandler);
}

initializer();
