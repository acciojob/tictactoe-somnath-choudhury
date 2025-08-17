//your JS code here. If required.
const submitBtn = document.getElementById("submit");
const playerInputs = document.getElementById("player-inputs");
const gameSection = document.getElementById("game");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let board = Array(9).fill(null);
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

submitBtn.addEventListener("click", () => {
    player1 = document.getElementById("player1").value
    player2 = document.getElementById("player2").value

    if (player1 && player2) {
      currentPlayer = player1;
      playerInputs.classList.add("hidden");
      gameSection.classList.remove("hidden");
      message.textContent = `${currentPlayer}, you're up`;
    } else {
      alert("Please enter names for both players!");
    }
})

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (!gameActive || cell.textContent) return;

    let symbol = currentPlayer === player1 ? "X" : "O";
    board[index] = symbol;
    cell.textContent = symbol;

    if (checkWinner(symbol)) {
      message.textContent = `${currentPlayer}, congratulations you won!`;
      gameActive = false;
    } else if (board.every((cell) => cell !== null)) {
      message.textContent = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      message.textContent = `${currentPlayer}, you're up`;
    }
  });
});

function checkWinner(symbol) {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] === symbol && board[b] === symbol && board[c] === symbol) {
      highlightWinner(combo);
      return true;
    }
  }
  return false;
}

function highlightWinner(combo) {
  combo.forEach((i) => {
    cells[i].classList.add("winner");
  });
}
