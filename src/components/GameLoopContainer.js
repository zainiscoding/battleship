import shipFactory from './shipFactory';
import playerFactory from './playerFactory';
import DisplayGame from './DisplayGame';
import { useEffect, useState } from 'react';

const GameLoopContainer = (props) => {
  const [playerTurn, setPlayerTurn] = useState(true);
  const [player, setPlayer] = useState(playerFactory('Player'));
  const [computer, setComputer] = useState(playerFactory('PC'));
  const [playerShips, setPlayerShips] = useState([]);
  const [playerBoard, setPlayerBoard] = useState(player.playerBoard);
  const [computerBoard, setComputerBoard] = useState(computer.playerBoard);

  function playerHandler() {
    setPlayerBoard(player.playerBoard.placeShip(3, 3));
  }

  return (
    <DisplayGame
      player={player}
      computer={computer}
      setPlayerBoard={setPlayerBoard}
      playerHandler={playerHandler}
    />
  );
};

export default GameLoopContainer;
