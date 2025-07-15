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
    const player2 = Player('Player1', 'O');
    let currentPlayer = Player1;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const checkWin = () => {
        const board = GameBoard.getBoard();
        const wins = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8]
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return wins.some(([a, b, c]) => (board[a] && board[a] === board[b] && board[a] === board[c]))
    }

    let isGameOver = false;

    const playRound = () => {
        if (isGameOver || GameBoard.getBoard[index] != '') {
            return;
        }

        GameBoard.markCell(index, currentPlayer.symbol);

        if (checkWin()) {
            console.log(`${currentPlayer} has won!`)
            isGameOver = true;
            return;
        }

        switchPlayer();
    }

    return {checkWin, playRound}
})();