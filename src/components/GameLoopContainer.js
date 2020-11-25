import playerFactory from './playerFactory';
import DisplayGame from './DisplayGame';
import { useEffect, useState } from 'react';

const GameLoopContainer = (props) => {
  const [player, setPlayer] = useState(playerFactory('Player'));
  const [computer, setComputer] = useState(playerFactory('PC'));
  const [playerTurn, setPlayerTurn] = useState(true);

  function placeTestShip() {
    setComputer((prevState) => {
      prevState.playerBoard.placeShip(3, 5, 3, 'horizontal');
      prevState.playerBoard.placeShip(3, 5, 3, 'vertical');
      return { ...prevState };
    });
  }

  function playerAttackHandler(e) {
    if (playerTurn === true) {
      setComputer((prevState) => {
        prevState.playerBoard.receiveAttack(
          e.target.id,
          parseInt(e.target.getAttribute('data-x')),
          parseInt(e.target.getAttribute('data-y'))
        );
        return { ...prevState };
      });
      setPlayerTurn(false);
    }
  }

  function computerAttack() {
    let randomPosition = Math.floor(Math.random() * 100);
    if (playerTurn === false) {
      setPlayer((prevState) => {
        prevState.playerBoard.receiveAttack(randomPosition);
        return { ...prevState };
      });
      setPlayerTurn(true);
    }
  }

  //The computer takes a turn every time it's array changes (as a result of being attackedf)
  useEffect(() => {
    if (playerTurn === false) {
      //Timeout used to give the computer some fake thinking time
      setTimeout(function () {
        computerAttack();
      }, 1500);
    }
    // eslint-disable-next-line
  }, [playerTurn]);

  useEffect(() => {
    console.log(player);
    console.log(computer);
    // eslint-disable-next-line
  }, [computer]);

  //Used to set data values in the JSX of <DisplayGame>
  function setX(index) {
    let x = index;
    if (index > 9) {
      return (x = index % 10);
    } else {
      return x;
    }
  }

  //Same as above
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
      computerAttack={computerAttack}
    />
  );
};

export default GameLoopContainer;
