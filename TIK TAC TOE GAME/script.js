const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const message = document.createElement('div');
message.id = 'message';
document.body.insertBefore(message, resetButton);

const glitter = document.createElement('div');
glitter.className = 'glitter';
document.body.appendChild(glitter);

let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);

const winConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal
    [2, 4, 6], // Diagonal
];

function createGlitterEffect() {
    glitter.innerHTML = ''; // Clear existing glitter
    for (let i = 0; i < 150; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.width = `${Math.random() * 5 + 5}px`;
        dot.style.height = dot.style.width;
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        dot.style.animationDuration = `${Math.random() * 3 + 2}s`;
        dot.style.backgroundColor = Math.random() > 0.5 ? '#e74c3c' : '#3498db';
        glitter.appendChild(dot);
    }
}

function checkWin() {
    for (const [a, b, c] of winConditions) {
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }
    return null;
}

function handleClick(e) {
    const index = e.target.dataset.index;
    
    if (gameBoard[index] || checkWin()) return;

    gameBoard[index] = currentPlayer;
    e.target.classList.add(currentPlayer);
    e.target.textContent = currentPlayer;

    const winner = checkWin();
    if (winner) {
        createGlitterEffect(); // Create glitter effect
        message.textContent = `${winner} wins!`;
        message.style.color = winner === 'X' ? '#e74c3c' : '#3498db';
        return;
    }

    if (!gameBoard.includes(null)) {
        message.textContent = "It's a draw!";
        message.style.color = '#e67e22';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
    gameBoard = Array(9).fill(null);
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    message.textContent = '';
    glitter.innerHTML = ''; // Remove glitter effect
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
