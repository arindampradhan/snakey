import { useState, useEffect } from "react";
import { Direction } from "@/constants";
import NeonText from "@/components/NeonText";
import Cell from "@/components/Cell";
import { KeyboardEventType } from "@/constants";

interface SnakeProps {
  speed: number;
  onGameOver: (score : number) => void;
}

const SnakeGame = ({speed, onGameOver}: SnakeProps) => {
  const [snake, setSnake] = useState<{ x: number; y: number }[]>([
    { x: 10, y: 10 },
    { x: 10, y: 11 },
  ]);

  const [food, setFood] = useState<{ x: number; y: number }>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>(Direction.RIGHT);
  const [score, setScore] = useState<number>(0);


  const handleKeyPress = (e: KeyboardEvent) => {
    const newDirection: Direction = e.key
      .toUpperCase()
      .replace("ARROW", "") as Direction;
    const allowedDirections: Direction[] = [
      Direction.UP,
      Direction.DOWN,
      Direction.LEFT,
      Direction.RIGHT,
    ];
    if (allowedDirections.includes(newDirection)) {
      setDirection(newDirection);
    }
  };


  useEffect(() => {
    document.addEventListener(KeyboardEventType, handleKeyPress);
    return () =>
      document.removeEventListener(KeyboardEventType, handleKeyPress);
  }, []);

  useEffect(() => {
    const moveSnake = setInterval(() => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = {
          x:
            newSnake[0].x +
            (direction === Direction.LEFT
              ? -1
              : direction === Direction.RIGHT
              ? 1
              : 0),
          y:
            newSnake[0].y +
            (direction === Direction.UP
              ? -1
              : direction === Direction.DOWN
              ? 1
              : 0),
        };
        newSnake.unshift(head);
        newSnake.pop();
        return newSnake;
      });
    }, speed);
    return () => clearInterval(moveSnake);
  }, [direction]);

  useEffect(() => {
    const isFoodEaten = snake[0].x === food.x && snake[0].y === food.y;
    if (isFoodEaten) {
      setFood({
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20),
      });
      setScore((prevScore) => prevScore + 1);
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        newSnake.push({ ...prevSnake[prevSnake.length - 1] });
        return newSnake;
      });
    }
  }, [snake, food]);

  const isGameOver = () => {
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
        return true;
      }
    }

    // add case of hitting the wall
    if (
      snake[0].x < 0 ||
      snake[0].x > 19 ||
      snake[0].y < 0 ||
      snake[0].y > 19
    ) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (isGameOver()) {
      setSnake([
        { x: 10, y: 10 },
        { x: 10, y: 11 },
      ]);
      setScore(0);
      setDirection(Direction.RIGHT);
      onGameOver(score)
    }
  }, [snake, score]);

  return (
    <>
      <div className="game-container">
        {Array.from({ length: 20 }, (_, row) => (
          <div className="row" key={row}>
            {Array.from({ length: 20 }, (_, col) => {
              const isSnakeCell = snake.some((s) => s.x === col && s.y === row);
              const isFoodCell = food.x === col && food.y === row;
              if (isSnakeCell) {
                return <Cell type="snake" key={col} />;
              }
              if (isFoodCell) {
                return <Cell type="food" key={col} />;
              }
              return <Cell type="empty" key={col} />;
            })}
          </div>
        ))}
      </div>
      <NeonText size="small">Score: {score}</NeonText>
    </>
  );
};

export default SnakeGame;
