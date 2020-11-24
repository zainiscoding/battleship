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

  function placeTestShip() {
    setComputer((prevState) => {
      prevState.playerBoard.placeShip(3, 0, 3);
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
  }

  function setX(index) {
    let x = index;
    if (index > 9) {
      return (x = index % 10);
    } else {
      return x;
    }
  }

  function setY(index) {
    let y = 9;
    if (index > 89) {
      return (y = 0);
    } else if (index > 79) {
      return (y = 1);
    } else if (index > 69) {
      return (y = 2);
    } else if (index > 59) {
      return (y = 3);
    } else if (index > 49) {
      return (y = 4);
    } else if (index > 39) {
      return (y = 5);
    } else if (index > 29) {
      return (y = 6);
    } else if (index > 19) {
      return (y = 7);
    } else if (index > 9) {
      return (y = 8);
    } else {
      return y;
    }
  }

  return (
    <DisplayGame
      player={player}
      computer={computer}
      placeTestShip={placeTestShip}
      playerAttackHandler={playerAttackHandler}
      setX={setX}
      setY={setY}
    />
  );
};

export default GameLoopContainer;
