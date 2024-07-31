import React, { useState } from "react";
import "./App.css";
import Button from "./Button";

function App() {
  const [cell, setCell] = useState(Array(9).fill(null));
  const [nextPlayer, setNextPlayer] = useState(true);
  const winner = calculateWinner(cell);
  const isDraw = cell.every((cell) => cell) && !winner;
  let status;

  if (winner) {
    status = `Winner is ${winner}. Please restart the game.`;
  } else if (isDraw) {
    status = "It's a draw. Please restart the game.";
  } else {
    status = `Next player: ${nextPlayer ? "X" : "O"}`;
  }

  function change(i) {
    if (cell[i] || winner || isDraw) {
      return;
    }
    const nextSquares = cell.slice();
    nextSquares[i] = nextPlayer ? "X" : "O";
    setCell(nextSquares);
    setNextPlayer(!nextPlayer);
  }

  function restartGame() {
    setCell(Array(9).fill(null));
    setNextPlayer(true);
  }

  return (
    <div className="container">
      <div>
        {new Array(3).fill().map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {new Array(3).fill().map((_, colIndex) => {
              const buttonIndex = rowIndex * 3 + colIndex;
              return (
                <Button
                  key={buttonIndex}
                  onSquareClick={() => change(buttonIndex)}
                  value={cell[buttonIndex]}
                />
              );
            })}
          </div>
        ))}
      </div>

      <br />
      <div className="status">{status}</div>

      <button onClick={restartGame} className="restart-button">
        Restart
      </button>
    </div>
  );
}

function calculateWinner(cell) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (cell[a] && cell[a] === cell[b] && cell[a] === cell[c]) {
      return cell[a];
    }
  }
  return null;
}

export default App;
