const { useState, useEffect } = React;

function TicTacToe() {
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

  const isBoardFull = (squares) => squares.every(square => square !== null);

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
      }, 400);
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
    <div style={{display:'flex',justifyContent:'center',padding:'20px'}}>
      <div style={{maxWidth:400,width:'100%',background:'#fff',padding:20,borderRadius:12,boxShadow:'0 8px 24px rgba(0,0,0,0.12)'}}>
        <h2 style={{textAlign:'center',marginBottom:8}}>Tic Tac Toe</h2>
        <p style={{textAlign:'center',color:'#555',marginBottom:12}}>Player (X) vs AI (O)</p>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:12}}>
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={!isPlayerTurn || gameOver}
              style={{height:64,fontSize:28,fontWeight:700,borderRadius:8,border:'1px solid #ddd',background: cell === 'X' ? '#1e90ff' : cell === 'O' ? '#ff6b6b' : '#f5f5f5',color: cell ? '#fff' : '#222'}}
            >
              {cell}
            </button>
          ))}
        </div>

        {gameOver && (
          <div style={{textAlign:'center',marginBottom:12}}>
            <p style={{fontWeight:700}}>{winner ? (winner === 'X' ? 'You Win!' : 'AI Wins!') : 'Draw!'}</p>
          </div>
        )}

        <div style={{display:'flex',gap:8}}>
          <button onClick={resetGame} style={{flex:1,padding:10,borderRadius:8,border:'none',background:'#6b46c1',color:'#fff'}}>New Game</button>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('tic-tac-toe-root'));
root.render(<TicTacToe />);
