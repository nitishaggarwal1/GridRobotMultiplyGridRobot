import React, { useState } from 'react';
import './App.css';

const directions = ['N', 'E', 'S', 'W'];

function App() {
  const [robot, setRobot] = useState({ x: 0, y: 0, direction: 'N' });

  const handleRotate = (direction) => {
    setRobot((prev) => ({
      ...prev,
      direction:
        direction === 'left'
          ? directions[(directions.indexOf(prev.direction) + 3) % 4]
          : directions[(directions.indexOf(prev.direction) + 1) % 4],
    }));
  };

  const handleMoveForward = () => {
    setRobot((prev) => {
      const { x, y, direction } = prev;
      let newX = x;
      let newY = y;
      switch (direction) {
        case 'N':
          if (y > 0) newY--;
          break;
        case 'E':
          if (x < 4) newX++;
          break;
        case 'S':
          if (y < 4) newY++;
          break;
        case 'W':
          if (x > 0) newX--;
          break;
        default:
          break;
      }
      return { ...prev, x: newX, y: newY };
    });
  };

  return (
    <div className="container">
      <div className="grid-wrapper">
        <div className="grid">
          {Array.from({ length: 25 }).map((_, index) => {
            const x = index % 5;
            const y = Math.floor(index / 5);
            const isRobotHere = robot.x === x && robot.y === y;
            return (
              <div
                key={index}
                className={`cell ${isRobotHere ? 'robot-cell' : ''}`}
              >
                {isRobotHere && (
                  <div
                    className="robot"
                    style={{ transform: `rotate(${directions.indexOf(robot.direction) * 90}deg)` }}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="bottom-controls">
          <button className="move-left" onClick={() => handleRotate('left')}>Move Left</button>
          <button className="move-right" onClick={() => handleRotate('right')}>Move Right</button>
        </div>
        <button className="move-forward" onClick={handleMoveForward}>Move Forward</button>
      </div>
    </div>
  );
}

export default App;
