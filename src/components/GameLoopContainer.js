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

  //Thanks to 'cyborg/human#5133' on TOP Discord for the way cleaner version of this function!
  function setY(index) {
    let y = 9;
    if (index > 89) {
      return (y = 0);
    } else {
      const val = Math.floor(index / 10);
      return (y = 9 - val);
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
