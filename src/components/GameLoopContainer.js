import shipFactory from './shipFactory';
import playerFactory from './playerFactory';
import DisplayGame from './DisplayGame';
import { useEffect, useState } from 'react';

const GameLoopContainer = (props) => {
  const [playerTurn, setPlayerTurn] = useState(true);
  const [player, setPlayer] = useState(playerFactory('Player'));
  const [computer, setComputer] = useState(playerFactory('PC'));
  const [playerShips, setPlayerShips] = useState([]);

  useEffect(() => {
    console.log(player);
    console.log(computer);
    // eslint-disable-next-line
  }, [computer]);

  function playerHandler() {
    setComputer((prevState) => {
      prevState.playerBoard.placeShip(3, 9, 3);
      return { ...prevState };
    });
  }

  function playerAttackHandler(e) {
    const targetBlock = parseInt(e.target.id);
    console.log(targetBlock);
    setComputer((prevState) => {
      prevState.playerBoard.receiveAttack(targetBlock);
      return { ...prevState };
    });
    console.log(computer);
  }

  function logger(e) {
    console.log(e.target.id);
  }

  return (
    <DisplayGame
      player={player}
      computer={computer}
      playerHandler={playerHandler}
      logger={logger}
      playerAttackHandler={playerAttackHandler}
    />
  );
};

export default GameLoopContainer;
