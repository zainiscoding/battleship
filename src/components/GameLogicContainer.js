import playerFactory from './playerFactory';
import DisplayGame from './DisplayGame';
import { useEffect, useState } from 'react';

const GameLogicContainer = (props) => {
  const [player, setPlayer] = useState(playerFactory('Player'));
  const [computer, setComputer] = useState(playerFactory('Computer'));
  const [playerTurn, setPlayerTurn] = useState(true);
  const [hitPlayerBlocks, setHitPlayerBlocks] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [preparing, setPreparing] = useState(true);
  const [placingShip, setPlacingShip] = useState(false);
  const [chosenShip, setChosenShip] = useState();
  const [shipNumber, setShipNumber] = useState(0);
  const [placementError, setPlacementError] = useState(false);
  const [placeAllShipsError, setPlaceAllShipsError] = useState(false);
  const [playerWins, setPlayerWins] = useState();

  function placeComputerShips() {
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

    //Generate positions for a new ship
    function generateShipPlacement(shipLength) {
      const newShip = {
        x: xGenerator(),
        y: yGenerator(),
        length: shipLength,
        orientation: orientationGenerator(),
      };
      //Prevent impossible ships (going off grid)
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
      return newShip;
    }

    const newShip = generateShipPlacement(2);
    const newShip2 = generateShipPlacement(3);
    const newShip3 = generateShipPlacement(3);
    const newShip4 = generateShipPlacement(4);
    const newShip5 = generateShipPlacement(5);

    let newComputerState = computer;

    function placeShipArguments(ship) {
      return [ship.x, ship.y, ship.length, ship.orientation];
    }

    const placeShip1 = newComputerState.gameBoard.placeShip(
      ...placeShipArguments(newShip)
    );

    const placeShip2 = newComputerState.gameBoard.placeShip(
      ...placeShipArguments(newShip2)
    );

    const placeShip3 = newComputerState.gameBoard.placeShip(
      ...placeShipArguments(newShip3)
    );

    const placeShip4 = newComputerState.gameBoard.placeShip(
      ...placeShipArguments(newShip4)
    );

    const placeShip5 = newComputerState.gameBoard.placeShip(
      ...placeShipArguments(newShip5)
    );

    const placedShips = [
      placeShip1,
      placeShip2,
      placeShip3,
      placeShip4,
      placeShip5,
    ];

    //If a ship overlaps another ship, create a new one
    placedShips.forEach((ship) => {
      while (ship !== true) {
        let replacementShip = generateShipPlacement(ship.getShipLength());
        ship = newComputerState.gameBoard.placeShip(
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
  }

  function playerAttackHandler(e) {
    if (playerTurn && !preparing) {
      setComputer((prevState) => {
        prevState.gameBoard.receiveAttack(
          e.target.id,
          parseInt(e.target.getAttribute('data-x')),
          parseInt(e.target.getAttribute('data-y'))
        );
        setPlayerTurn(false);
        return { ...prevState };
      });
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
        let placedShip = prevState.gameBoard.placeShip(
          targetBlockX,
          targetBlockY,
          chosenShip.shipLength,
          chosenShip.orientation,
          shipNumber
        );
        if (placedShip === true) {
          player.playerShips[shipNumber].placed = true;
          setPlacementError(false);
          setPlacingShip(false);
        } else {
          setPlacementError(true);
        }
        return { ...prevState };
      });
    }
  }

  function removeShipFromBoard(e) {
    if (preparing && !placingShip) {
      setPlayer((prevState) => {
        const targetShip = parseInt(e.target.getAttribute('data-shipnumber'));
        const blockId = parseInt(e.target.id);
        player.playerShips[targetShip].placed = false;
        player.gameBoard.removeShip(targetShip, blockId);
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

  function startGame() {
    const playerShips = [];
    placeComputerShips();

    player.gameBoard.gameBoardArray.forEach((arrayItem) => {
      if (arrayItem.ship && !playerShips.includes(arrayItem.ship)) {
        playerShips.push(arrayItem.ship);
      }
    });
    if (preparing && playerShips.length === 5) {
      setPreparing(false);
      setPlaceAllShipsError(false);
    } else {
      setPlaceAllShipsError(true);
    }
  }

  function restartGame() {
    setPreparing(true);
    setPlayerTurn(true);
    setHitPlayerBlocks([]);
    setGameOver(false);
    setPlayerWins('');
    setPlayer(playerFactory('Player'));
    setComputer(playerFactory('Computer'));
  }

  //The computer takes a turn whenever playerTurn changes (ie. whenever attacked)
  useEffect(() => {
    function computerAttack() {
      let position = 0;

      //Choose a random position to attack
      function getPosition() {
        return (position = Math.floor(Math.random() * 100));
      }
      setHitPlayerBlocks([...hitPlayerBlocks, getPosition()]);

      //Prevents repeat hits
      while (
        hitPlayerBlocks.includes(position) &&
        hitPlayerBlocks.length < 100
      ) {
        setHitPlayerBlocks([...hitPlayerBlocks, getPosition()]);
      }

      setPlayer((prevState) => {
        prevState.gameBoard.receiveAttack(
          position,
          parseInt(prevState.gameBoard.gameBoardArray[position].x),
          parseInt(prevState.gameBoard.gameBoardArray[position].y)
        );
        return { ...prevState };
      });

      setPlayerTurn(true);
    }
    if (!playerTurn) {
      //Timeout used to give the computer some fake thinking time
      setTimeout(function () {
        computerAttack();
      }, 0);
    }
    // eslint-disable-next-line
  }, [playerTurn]);

  //Checks for game over
  useEffect(() => {
    if (!preparing) {
      const computerShips = [];
      const playerShips = [];
      computer.gameBoard.gameBoardArray.forEach((arrayItem) => {
        if (arrayItem.ship && !computerShips.includes(arrayItem.ship)) {
          computerShips.push(arrayItem.ship);
        }
      });

      player.gameBoard.gameBoardArray.forEach((arrayItem) => {
        if (arrayItem.ship && !playerShips.includes(arrayItem.ship)) {
          playerShips.push(arrayItem.ship);
        }
      });

      if (computerShips.every((ship) => ship.isSunk())) {
        setPlayerWins(true);
        setGameOver(true);
      }

      if (playerShips.every((ship) => ship.isSunk())) {
        setPlayerWins(false);
        setGameOver(true);
      }
    }
  }, [computer, preparing, player.gameBoard.gameBoardArray]);

  return (
    <DisplayGame
      player={player}
      computer={computer}
      playerAttackHandler={playerAttackHandler}
      chooseShip={chooseShip}
      placeChosenShip={placeChosenShip}
      rotateShip={rotateShip}
      preparing={preparing}
      startGame={startGame}
      restartGame={restartGame}
      removeShipFromBoard={removeShipFromBoard}
      placementError={placementError}
      placeAllShipsError={placeAllShipsError}
      playerWins={playerWins}
      gameOver={gameOver}
    />
  );
};

export default GameLogicContainer;
