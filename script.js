document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('gameContainer');
    const playButton = document.getElementById('playButton');
    const playComputer = document.getElementById('playComputer');
    const gameBoard = document.getElementById('gameBoard');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('resetButton');
    const goBackButton = document.getElementById('goBack');
    let currentPlayer = 'X';
    let isGameOver = false;
    let isComputerMode = false;
    function toggleGameContainer() {
        gameContainer.classList.toggle('hidden');
        playButton.classList.toggle('hidden');
        playComputer.classList.toggle('hidden');

        if (!gameContainer.classList.contains('hidden')) {
            playButton.style.display = 'none';
            playComputer.style.display = 'none';
            resetGame();
        } else {
            playButton.style.display = 'block';
            playComputer.style.display = 'block';
        }

        if (!gameContainer.classList.contains('hidden')) {
            initializeGameBoard();
        }
    }
    function initializeGameBoard() {
        gameBoard.innerHTML = '';
        if (isComputerMode) {
            status.textContent = `You are player 'X' and player 'O' is computer. Press any empty box to begin the game play`;
        } else {
            status.textContent = `You are player 'X' and player 'O'. Press any empty box to begin the game play`;
        }
        status.classList.add('black-text');
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        }
        currentPlayer = 'X';
        isGameOver = false;
    }
    function handleCellClick(event) {
        if (isGameOver) return;

        const clickedCell = event.target;
        if (clickedCell.textContent === '') {
            clickedCell.textContent = currentPlayer;
            clickedCell.classList.add('occupied');
            checkGameStatus();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (isComputerMode && currentPlayer === 'O') {
                makeComputerMove();
            }
        }
    }
    function checkGameStatus() {
        const cells = document.querySelectorAll('.cell');
        const cellValues = Array.from(cells).map((cell) => cell.textContent);
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (cellValues[a] && cellValues[a] === cellValues[b] && cellValues[a] === cellValues[c]) {
                isGameOver = true;
                status.textContent = `Player '${cellValues[a]}' wins!`;
                return;
            }
        }
        if (!cellValues.includes('')) {
            isGameOver = true;
            status.textContent = "It's a draw!";
            return;
        }
    }
    function makeComputerMove() {
        const emptyCells = document.querySelectorAll('.cell:not(.occupied)');
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const randomCell = emptyCells[randomIndex];
            randomCell.textContent = currentPlayer;
            randomCell.classList.add('occupied');
            checkGameStatus();
            currentPlayer = 'X';
        }
    }
    function resetGame() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
            cell.textContent = '';
            cell.classList.remove('occupied');
        });
        currentPlayer = 'X';
        isGameOver = false;
        if (isComputerMode) {
            status.textContent = `You are player 'X' and player 'O' is computer. Press any empty box to begin the game play`;
        } else {
            status.textContent = `You are player 'X' and player 'O'. Press any empty box to begin the game play`;
        }
        status.classList.add('black-text');
    }
    function goBack() {
        gameContainer.classList.add('hidden');
        playButton.classList.remove('hidden');
        playComputer.classList.remove('hidden');
        thankYouMessage.classList.remove('hidden');
        status.textContent = "Thank you for playing!";
    }
    resetButton.addEventListener('click', resetGame);

    function handlePlayButtonClick(computerMode) {
        isComputerMode = computerMode;
        toggleGameContainer();
    }
    playButton.addEventListener('click', () => handlePlayButtonClick(false));
    playComputer.addEventListener('click', () => handlePlayButtonClick(true));
    goBackButton.addEventListener('click', goBack);
});