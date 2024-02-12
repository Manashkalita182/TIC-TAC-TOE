document.addEventListener('DOMContentLoaded', function () {
    const cells = document.querySelectorAll('.cell');
    const newGameButton = document.getElementById('new-game');
    const winnerDisplay = document.getElementById('winner-display');
    const playerModeSelect = document.getElementById('player-mode');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let isAgainstAI = false;

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
            [0, 4, 8], [2, 4, 6]              // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return null;
    }

    function checkDraw() {
        return !gameBoard.includes('');
    }

    function handleCellClick(index) {
        if (!gameBoard[index] && gameActive) {
            gameBoard[index] = currentPlayer;
            cells[index].textContent = currentPlayer;

            const winner = checkWinner();
            const draw = checkDraw();

            if (winner) {
                winnerDisplay.textContent = `Player ${winner} wins!`;
                gameActive = false;
            } else if (draw) {
                winnerDisplay.textContent = 'It\'s a draw!';
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

                if (isAgainstAI && currentPlayer === 'O') {
                    playAI();
                }
            }
        }
    }

    function playAI() {
        // Simple AI: Randomly choose an empty cell
        const emptyCells = gameBoard.reduce((acc, val, index) => {
            if (!val) {
                acc.push(index);
            }
            return acc;
        }, []);

        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            handleCellClick(emptyCells[randomIndex]);
        }
    }

    function handlePlayerModeChange() {
        isAgainstAI = playerModeSelect.value === 'ai';
        handleNewGameClick();
    }

    function handleNewGameClick() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => cell.textContent = '');
        winnerDisplay.textContent = '';
        gameActive = true;
        currentPlayer = 'X';

        if (isAgainstAI && currentPlayer === 'O') {
            playAI();
        }
    }

    cells.forEach(cell => {
        cell.addEventListener('click', () => handleCellClick(cell.dataset.index));
    });

    newGameButton.addEventListener('click', handleNewGameClick);
    playerModeSelect.addEventListener('change', handlePlayerModeChange);
});
