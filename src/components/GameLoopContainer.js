import playerFactory from './playerFactory';
import DisplayGame from './DisplayGame';
import { useEffect, useState } from 'react';

const GameLoopContainer = (props) => {
  const [player, setPlayer] = useState(playerFactory('Player'));
  const [computer, setComputer] = useState(playerFactory('PC'));
  const [computerBoard, setComputerBoard] = useState([]);

  useEffect(() => {
    console.log(player);
    console.log(computer);
    // eslint-disable-next-line
  }, [computer]);

  useEffect(() => {
    setComputerBoard(computer.playerBoard.gameBoardArray);
    // eslint-disable-next-line
  }, [computer]);

  function placeTestShip() {
    setComputer((prevState) => {
      prevState.playerBoard.placeShip(3, 5, 3, 'horizontal');
      prevState.playerBoard.placeShip(3, 5, 3, 'vertical');
      return { ...prevState };
    });
  }

  function playerAttackHandler(e) {
    setComputer((prevState) => {
      prevState.playerBoard.receiveAttack(
        e.target.id,
        parseInt(e.target.getAttribute('data-x')),
        parseInt(e.target.getAttribute('data-y'))
      );
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
