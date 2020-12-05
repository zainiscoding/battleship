import playerFactory from './playerFactory';
import DisplayGame from './DisplayGame';
import { useEffect, useState } from 'react';

const GameLoopContainer = (props) => {
  const [player, setPlayer] = useState(playerFactory('Player'));
  const [computer, setComputer] = useState(playerFactory('PC'));
  const [playerTurn, setPlayerTurn] = useState(true);
  const [hitPlayerBlocks, setHitPlayerBlocks] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [preparing, setPreparing] = useState(true);
  const [placingShip, setPlacingShip] = useState(false);
  const [chosenShip, setChosenShip] = useState();
  const [shipNumber, setShipNumber] = useState(0);
  const [placementError, setPlacementError] = useState(false);

  function placeTestShip() {
    setComputer((prevState) => {
      prevState.playerBoard.placeShip(3, 5, 3, 'horizontal');
      return { ...prevState };
    });
    console.log(computer.playerBoard.gameBoardArray);
  }

  function playerAttackHandler(e) {
    setComputer((prevState) => {
      if (playerTurn && !preparing) {
        prevState.playerBoard.receiveAttack(
          e.target.id,
          parseInt(e.target.getAttribute('data-x')),
          parseInt(e.target.getAttribute('data-y'))
        );
        setPlayerTurn(false);
        return { ...prevState };
      }
    });
  }

  function computerAttack() {
    let position = 0;
    function getPosition() {
      return (position = Math.floor(Math.random() * 100));
    }
    setHitPlayerBlocks([...hitPlayerBlocks, getPosition()]);

    //Prevents repeat hits
    while (hitPlayerBlocks.includes(position) && hitPlayerBlocks.length < 100) {
      setHitPlayerBlocks([...hitPlayerBlocks, getPosition()]);
    }

    setPlayer((prevState) => {
      prevState.playerBoard.receiveAttack(
        position,
        parseInt(prevState.playerBoard.gameBoardArray[position].x),
        parseInt(prevState.playerBoard.gameBoardArray[position].y)
      );
      return { ...prevState };
    });
    console.log(player);
    setPlayerTurn(true);
  }

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

  function chooseShip(e) {
    const chosenShip = {
      shipLength: parseInt(e.target.getAttribute('data-length')),
      orientation: e.target.getAttribute('data-orientation'),
    };
    setPlacingShip(true);
    setShipNumber(parseInt(e.target.getAttribute('data-shipnumber')));
    setChosenShip(chosenShip);
  }

  function placeChosenShip(e) {
    if (placingShip) {
      setPlayer((prevState) => {
        const targetBlockX = parseInt(e.target.getAttribute('data-x'));
        const targetBlockY = parseInt(e.target.getAttribute('data-y'));
        let placedShip = prevState.playerBoard.placeShip(
          targetBlockX,
          targetBlockY,
          chosenShip.shipLength,
          chosenShip.orientation,
          shipNumber
        );
        setPlacingShip(false);
        if (placedShip) {
          player.playerShips[shipNumber].placed = true;
          setPlacementError(false);
        } else {
          setPlacementError(true);
        }
        return { ...prevState };
      });
    }
    console.log(player.playerBoard.gameBoardArray);
  }

  function removeShipFromBoard(e) {
    if (preparing) {
      setPlayer((prevState) => {
        const targetShip = parseInt(e.target.getAttribute('data-shipnumber'));
        const blockId = parseInt(e.target.id);
        console.log(blockId);
        player.playerShips[targetShip].placed = false;
        player.playerBoard.removeShip(targetShip, blockId);
        return { ...prevState };
      });
    }
  }

  function rotateShip(e) {
    e.stopPropagation();
    if (!placingShip) {
      const targetShipNumber = e.target.parentNode.getAttribute(
        'data-shipnumber'
      );
      const orientation = e.target.parentNode.getAttribute('data-orientation');

      orientation === 'horizontal'
        ? setPlayer((prevState) => {
            prevState.rotateHorizontalShip(targetShipNumber);
            return { ...prevState };
          })
        : setPlayer((prevState) => {
            prevState.rotateVerticalShip(targetShipNumber);
            return { ...prevState };
          });
    }
  }

  useEffect(() => {
    if (!player.playerShips.length) {
      //Timeout used to give the computer some fake thinking time
      setTimeout(function () {
        computerAttack();
      }, 0);
    }
    //eslint-disable-next-line
  }, [playerTurn]);

  //The computer takes a turn whenever playerTurn changes (ie. whenever attacked)
  useEffect(() => {
    if (!playerTurn) {
      //Timeout used to give the computer some fake thinking time
      setTimeout(function () {
        computerAttack();
      }, 0);
    }
    //eslint-disable-next-line
  }, [playerTurn]);

  //Checks for game over
  useEffect(() => {
    if (!preparing) {
      const computerShips = [];
      const playerShips = [];
      computer.playerBoard.gameBoardArray.forEach((arrayItem) => {
        if (arrayItem.ship && !computerShips.includes(arrayItem.ship)) {
          computerShips.push(arrayItem.ship);
        }
      });

      player.playerBoard.gameBoardArray.forEach((arrayItem) => {
        if (arrayItem.ship && !playerShips.includes(arrayItem.ship)) {
          playerShips.push(arrayItem.ship);
        }
      });

      if (computerShips.every((ship) => ship.isSunk())) {
        console.log('all sunk! winner!');
        setGameOver(true);
      }

      if (playerShips.every((ship) => ship.isSunk())) {
        console.log('all sunk! loser!');
        setGameOver(true);
      }
    }
    // eslint-disable-next-line
  }, [computer]);

  function startGame() {
    setPreparing(false);
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
      chooseShip={chooseShip}
      placeChosenShip={placeChosenShip}
      rotateShip={rotateShip}
      preparing={preparing}
      startGame={startGame}
      removeShipFromBoard={removeShipFromBoard}
      placementError={placementError}
    />
  );
};

export default GameLoopContainer;
