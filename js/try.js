var gBoard;
var gSize = 4;
var gMine = 2;
var gClicked = { i: null, j: null };
var gNegMines = 0;
var gFirsTime = true;

const COVER = `<span class="COVER">🟦</span>`;
const EMPTY = `<span class="EMPTY"> . </span>`;
const FLAG = `<span class="FLAG">🚩</span>`;
const MINE = `<span class="MINE">💣</span>`;
const HAPPY = "😃";
const SAD = "🤕";
const WIN = "🥳";
const DEAD = "😵";
var smileyBtn;
var gGame = {
  isOn: true,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
};

function onInit() {
    if(gGame.isOn){
  gBoard = buildBoard();
  renderBoard(gBoard);
  smileyBtn = HAPPY;
  //   addMine();
  //   addMine();
  mineDevelop();
  changeSmile(HAPPY);
  boardMinesCount(gBoard);
  gBoard.isOn = true;
  // updateScore(gMine)
    }else gameover()
}
function mineDevelop() {
  gBoard[1][1] = MINE;
  gBoard[2][2] = MINE;
}
function buildBoard() {
  const board = [];

  for (var i = 0; i < gSize; i++) {
    board.push([]);
    for (var j = 0; j < gSize; j++) {
      board[i][j] = {
        type: EMPTY,
        minesAroundCount: gNegMines,
        isShown: false,
        isMine: false,
        isMarked: true,
      };
    }
  }
  board[1][1].type = MINE;
  board[2][2].type = MINE;
  return board;
}
function getEmptyLocation(board) {
  var emptyLocations = [];
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (board[i][j].type === EMPTY) {
        emptyLocations.push({ i, j });
      }
    }
  }
  if (!emptyLocations.length) return null;
  var randIdx = getRandomIntInclusive(0, emptyLocations.length - 1);
  return emptyLocations[randIdx];
}
function addMine() {
  var emptyLocation = getEmptyLocation(gBoard);
  if (!emptyLocation) return;
  // Update Model
  gBoard[emptyLocation.i][emptyLocation.j] = MINE;
  // Update DOM
  renderCell(emptyLocation, MINE);
}
function renderBoard(board) {
  var strHTML = "<table><tbody>";
  for (var i = 0; i < board.length; i++) {
    strHTML += "<tr>";
    for (var j = 0; j < board[0].length; j++) {
      const cell = board[i][j].type;
      //   var clickCount = board[i][j].minesAroundCount;
      const className = `cell cell-${i}-${j}`;

      strHTML += `<td class="${className}"onclick="onCellClicked(${i}, ${j})"><div class="box">${cell}</div></td>`;
    }

    strHTML += "</tr>";
  }
  //   console.log('yadayada',clickCount);
  strHTML += "</tbody></table>";
  const elContainer = document.querySelector(".board-container");
  elContainer.innerHTML = strHTML;
}
function boardMinesCount(board) {
  var mineLocations = [];
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (board[i][j] === MINE) {
        mineLocations.push({ i, j });
      }
    }
  }
  //   console.log(mineLocations.length);
  document.querySelector("h4 span").innerText = mineLocations.length;
  if (!mineLocations.length) return;
}
function onCellClicked(i, j) {
    // console.log( gGame.shownCount)
    gGame.shownCount++
    // console.log( gGame.shownCount)
  gClicked.i = i;
  gClicked.j = j;
//   handleKey(event)
  // console.log(gNegMines);

  setMinesNegsCount(gClicked);
  const cell = gBoard[i][j];
  const elCell = document.querySelector(`.cell-${i}-${j}`);
  console.log("elCell", elCell);
  //   elCell.innerText = cell.minesAroundCount;
  elCell.innerText = gNegMines;
  console.log("elCell.innerText", cell.minesAroundCount);
}
function setMinesNegsCount(gClicked) {
  var negsCount = 0;
  for (var i = gClicked.i - 1; i <= gClicked.i + 1; i++) {
    if (i < 0 || i >= gBoard.length) continue;
    for (var j = gClicked.j - 1; j <= gClicked.j + 1; j++) {
      if (j < 0 || j >= gBoard[i].length) continue;
      if (i === gClicked.i && j === gClicked.j) continue;
      var currCell = gBoard[i][j];
      if (currCell === MINE) {
        negsCount++;
      }
    }
  }
  gNegMines = negsCount;
  return negsCount;
}

// function updateScore(diff) {
//     // Model
//     mineLocations.length -= diff
//     // DOM

// }

function changeSmile(mood) {
  var elSmile = document.querySelector(".smileyBtn");
  elSmile.innerText = `${mood}`;
}

function restart() {
  onInit();
}

function changeLevel(mat, mines) {
  gSize = mat;
  gMine = mines;
  onInit();
}

// onCellMarked(elCell)

// checkGameOver()

// function game over()


// function handleKey(event){
// switch (event.key) {
//     case "ArrowLeft":
//       moveTo(i, j - 1);
//       break;
//     case "ArrowRight":
//       moveTo(i, j + 1);
//       break;
//     case "ArrowUp":
//       moveTo(i - 1, j);
//       break;
//     case "ArrowDown":
//       moveTo(i + 1, j);
//       break;
//   }
// }



// $('#element').mousedown(function(event) {
//     switch (event.which) {
//         case 1:
//             alert('Left Mouse button pressed.');
//             break;
//         case 2:
//             alert('Middle Mouse button pressed.');
//             break;
//         case 3:
//             alert('Right Mouse button pressed.');
//             break;
//         default:
//             alert('You have a strange Mouse!');
//     }
// });
