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
  const [placeAllShipsError, setPlaceAllShipsError] = useState(false);

  function placeTestShip() {
    const computerShips = [];

    function xGenerator() {
      let x = Math.floor(Math.random() * 10);
      return x;
    }

    function yGenerator() {
      let y = Math.floor(Math.random() * 10);
      return y;
    }

    function orientationGenerator() {
      let orientationNumber = Math.floor(Math.random() * 10);
      if (orientationNumber % 2 === 0) {
        return 'horizontal';
      } else {
        return 'vertical';
      }
    }

    function generateShipPlacement(shipLength) {
      // prevState.playerBoard.placeShip(3, 5, 3, 'horizontal');
      const newShip = {
        x: xGenerator(),
        y: yGenerator(),
        length: shipLength,
        orientation: orientationGenerator(),
      };
      while (
        (newShip.x !== null &&
          newShip.x + shipLength > 10 &&
          newShip.orientation === 'horizontal') ||
        (newShip.y - shipLength < -1 && newShip.orientation === 'vertical') ||
        newShip === undefined
      ) {
        newShip.x = xGenerator();
        newShip.y = yGenerator();
      }
      computerShips.push(newShip);
      return newShip;
    }

    let newShip = generateShipPlacement(2);
    let newShip2 = generateShipPlacement(3);
    let newShip3 = generateShipPlacement(3);
    let newShip4 = generateShipPlacement(4);
    let newShip5 = generateShipPlacement(5);

    let newComputerState = computer;

    let placeShip1 = newComputerState.playerBoard.placeShip(
      newShip.x,
      newShip.y,
      newShip.length,
      newShip.orientation
    );

    let placeShip2 = newComputerState.playerBoard.placeShip(
      newShip2.x,
      newShip2.y,
      newShip2.length,
      newShip2.orientation
    );

    let placeShip3 = newComputerState.playerBoard.placeShip(
      newShip3.x,
      newShip3.y,
      newShip3.length,
      newShip3.orientation
    );

    let placeShip4 = newComputerState.playerBoard.placeShip(
      newShip4.x,
      newShip4.y,
      newShip4.length,
      newShip4.orientation
    );

    let placeShip5 = newComputerState.playerBoard.placeShip(
      newShip5.x,
      newShip5.y,
      newShip5.length,
      newShip5.orientation
    );

    const placedShips = [
      placeShip1,
      placeShip2,
      placeShip3,
      placeShip4,
      placeShip5,
    ];

    //This needs to be cleaned up lol

    placedShips.forEach((ship) => {
      while (ship !== true) {
        let replacementShip = generateShipPlacement(ship.getShipLength());
        ship = newComputerState.playerBoard.placeShip(
          replacementShip.x,
          replacementShip.y,
          replacementShip.length,
          replacementShip.orientation
        );
        setComputer(newComputerState);
      }
    });

    setComputer(newComputerState);
    setComputer((newComputerState) => {
      return { ...newComputerState };
    });

    //fix edge detection

    // setComputer((prevState) => {
    //   generateShipPlacement(prevState, 2);
    //   generateShipPlacement(prevState, 3);
    //   generateShipPlacement(prevState, 3);
    //   generateShipPlacement(prevState, 4);
    //   generateShipPlacement(prevState, 5);
    //   while (computerShips.some((ship) => ship === undefined)) {
    //     computerShips.forEach((ship) => {
    //       const shipIndex = computerShips.indexOf(ship);
    //       console.log(computerShips);
    //       if (ship === undefined) {
    //         computerShips.splice(shipIndex, 1);
    //         if (shipIndex === 0) {
    //           generateShipPlacement(prevState, 2);
    //         } else if (shipIndex === 3) {
    //           generateShipPlacement(prevState, 4);
    //         } else if (shipIndex === 4) {
    //           generateShipPlacement(prevState, 5);
    //         } else {
    //           generateShipPlacement(prevState, 3);
    //         }
    //       }
    //     });
    //   }
    //   return { ...prevState };
    // });
  }

  function playerAttackHandler(e) {
    if (playerTurn && !preparing) {
      setComputer((prevState) => {
        prevState.playerBoard.receiveAttack(
          e.target.id,
          parseInt(e.target.getAttribute('data-x')),
          parseInt(e.target.getAttribute('data-y'))
        );
        setPlayerTurn(false);
        return { ...prevState };
      });
    }
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
  //Thanks to 'cyborg/human#5133' on TOP Discord for the much cleaner version of this function!
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
    const playerShips = [];

    player.playerBoard.gameBoardArray.forEach((arrayItem) => {
      if (arrayItem.ship && !playerShips.includes(arrayItem.ship)) {
        playerShips.push(arrayItem.ship);
      }
    });
    if (preparing && playerShips.length === 5) {
      setPreparing(false);
    } else {
      setPlaceAllShipsError(true);
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
