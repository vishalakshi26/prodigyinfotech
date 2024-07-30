const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const restartButton = document.getElementById('restart-button');

let isXTurn = true;
let gameBoard = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal
    [2, 4, 6]  // other diagonal
];

function handleClick(e) {
    const cell = e.target;
    const index = Array.from(cells).indexOf(cell);

    if (gameBoard[index] || checkWin()) return;

    gameBoard[index] = isXTurn ? 'X' : 'O';
    cell.textContent = gameBoard[index];
    cell.classList.add(isXTurn ? 'X' : 'O');

    if (checkWin()) {
        setTimeout(() => alert(`${isXTurn ? 'X' : 'O'} Wins!`), 100);
    } else if (!gameBoard.includes('')) {
        setTimeout(() => alert('It\'s a Draw!'), 100);
    }

    isXTurn = !isXTurn;
}

function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    isXTurn = true;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
