const Player = (name, symbol) => {
    return {name, symbol};
}

const GameBoard = (function () {
    const board = ['','','','','','','','',''];

    const getBoard = () => {
        return [...board];
    }

    const resetBoard = () => {
        board.fill('');
    }

    const markCell = (index, symbol) => {
        if (board[index] == '') {
            board[index] = symbol;
        }
    }

    return {getBoard, resetBoard, markCell};
})();

const GameController = (function () {
    const player1 = Player('Player1', 'X');
    const player2 = Player('Player2', 'O');
    let currentPlayer = player1;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const checkWin = () => {
        const board = GameBoard.getBoard();
        const wins = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return wins.some(([a, b, c]) => (board[a] && board[a] === board[b] && board[a] === board[c]))
    }

    let isGameOver = false;

    const playRound = (index) => {
        if (isGameOver || GameBoard.getBoard()[index] != '') {
            return;
        }

        GameBoard.markCell(index, currentPlayer.symbol);
        DisplayController.render();

        if (checkWin()) {
            console.log(`${currentPlayer} has won!`)
            isGameOver = true;
            return;
        }

        switchPlayer();
    }

    const resetButton = document.querySelector('#reset-button');
    resetButton.addEventListener('click', () => {
        GameBoard.resetBoard();
        DisplayController.render();
    })

    return {checkWin, playRound}
})();

const DisplayController = (function () {
    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell,index) => {
        cell.addEventListener('click', () => {
            GameController.playRound(index);
        })
    })

    const render = () => {
        const board = GameBoard.getBoard();

        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        })
    }

    return {render};
})();