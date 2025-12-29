import React, { useState, useEffect } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ player: 0, ai: 0, draws: 0 });

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const isBoardFull = (squares) => {
    return squares.every(square => square !== null);
  };

  const minimax = (squares, depth, isMaximizing) => {
    const result = checkWinner(squares);
    
    if (result === 'O') return 10 - depth;
    if (result === 'X') return depth - 10;
    if (isBoardFull(squares)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (squares[i] === null) {
          squares[i] = 'O';
          let score = minimax(squares, depth + 1, false);
          squares[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (squares[i] === null) {
          squares[i] = 'X';
          let score = minimax(squares, depth + 1, true);
          squares[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const getBestMove = (squares) => {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < 9; i++) {
      if (squares[i] === null) {
        squares[i] = 'O';
        let score = minimax(squares, 0, false);
        squares[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };

  useEffect(() => {
    if (!isPlayerTurn && !gameOver) {
      const timer = setTimeout(() => {
        const newBoard = [...board];
        const bestMove = getBestMove(newBoard);
        if (bestMove !== null) {
          newBoard[bestMove] = 'O';
          setBoard(newBoard);
          
          const gameWinner = checkWinner(newBoard);
          if (gameWinner) {
            setWinner(gameWinner);
            setGameOver(true);
            setScores(prev => ({ ...prev, ai: prev.ai + 1 }));
          } else if (isBoardFull(newBoard)) {
            setGameOver(true);
            setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
          } else {
            setIsPlayerTurn(true);
          }
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, gameOver, board]);

  const handleClick = (index) => {
    if (board[index] || gameOver || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameOver(true);
      setScores(prev => ({ ...prev, player: prev.player + 1 }));
    } else if (isBoardFull(newBoard)) {
      setGameOver(true);
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
    } else {
      setIsPlayerTurn(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameOver(false);
    setWinner(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">Tic Tac Toe</h1>
        <p className="text-center text-gray-600 mb-6">Player (X) vs AI (O)</p>
        
        <div className="grid grid-cols-3 gap-2 mb-6 bg-gray-200 p-3 rounded-lg">
          <div className="text-center p-3 bg-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{scores.player}</div>
            <div className="text-xs text-gray-600">Player</div>
          </div>
          <div className="text-center p-3 bg-gray-100 rounded-lg">
            <div className="text-2xl font-bold text-gray-600">{scores.draws}</div>
            <div className="text-xs text-gray-600">Draws</div>
          </div>
          <div className="text-center p-3 bg-red-100 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{scores.ai}</div>
            <div className="text-xs text-gray-600">AI</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`h-24 text-4xl font-bold rounded-xl transition-all duration-200 ${
                cell === 'X' ? 'bg-blue-500 text-white' :
                cell === 'O' ? 'bg-red-500 text-white' :
                'bg-gray-100 hover:bg-gray-200 active:scale-95'
              } ${!isPlayerTurn && !gameOver ? 'cursor-not-allowed opacity-50' : ''}`}
              disabled={!isPlayerTurn || gameOver}
            >
              {cell}
            </button>
          ))}
        </div>

        {gameOver && (
          <div className="text-center mb-4">
            <p className="text-2xl font-bold text-gray-800 mb-2">
              {winner ? (winner === 'X' ? '🎉 You Win!' : '🤖 AI Wins!') : '🤝 Draw!'}
            </p>
          </div>
        )}

        {!gameOver && (
          <p className="text-center text-lg font-semibold text-gray-700 mb-4">
            {isPlayerTurn ? '👤 Your turn' : '🤖 AI is thinking...'}
          </p>
        )}

        <button
          onClick={resetGame}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 active:scale-95"
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;