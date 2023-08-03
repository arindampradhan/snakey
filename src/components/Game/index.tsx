import NeonText from "@/components/NeonText";
import SnakeBoard from './SnakeBoard'
import { useState } from "react";

const Game = () => {
  const [speed, setSpeed] = useState<number>(500);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number | null>(null);

  const handleGameOver = (score: number) => {
    setScore(score);
    setGameOver(true);
  }
    
  const startGame = (speed: number) => {
    setSpeed(speed);
    setGameOver(false);
  }
 
  return (
    <div className="app">
      <NeonText>Snake Game</NeonText>
      {gameOver ? (
        <div className="game-over">
      <NeonText>Game Over,</NeonText>
      <NeonText>Your Score is {score}!</NeonText>
      <NeonText>Try Again</NeonText>
      </div>
      ): (
        <SnakeBoard speed={speed} onGameOver={handleGameOver} />
      )}
      <div className="button-group">
        <button onClick={() => startGame(500)}>Beginner</button>
        <button onClick={() => startGame(200)}>Intermediate</button>
        <button onClick={() => startGame(100)}>Goku</button>
      </div>
    </div>
  );
};

export default Game;
