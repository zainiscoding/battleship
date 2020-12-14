import playerFactory from './playerFactory';
import gameboardFactory from './gameboardFactory';
import DisplayGame from './DisplayGame';
import placeComputerShips from '../helper_functions/placeComputerShips';
import { useEffect, useState } from 'react';

const GameLogicContainer = (props) => {
  const [player, setPlayer] = useState(playerFactory('Player'));
  const [computer, setComputer] = useState(playerFactory('Computer'));
  const [playerBoard, setPlayerBoard] = useState(gameboardFactory());
  const [computerBoard, setComputerBoard] = useState(gameboardFactory());
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

  function playerAttackHandler(e) {
    if (playerTurn && !preparing && !gameOver) {
      setComputerBoard((prevState) => {
        prevState.receiveAttack(
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
    if (!placingShip) {
      const chosenShip = {
        shipLength: parseInt(e.target.getAttribute('data-length')),
        orientation: e.target.getAttribute('data-orientation'),
      };
      setPlacingShip(true);
      setShipNumber(parseInt(e.target.getAttribute('data-shipnumber')));
      setChosenShip(chosenShip);
      e.target.className += '--selected';
    }
  }

  function placeChosenShip(e) {
    if (placingShip) {
      setPlayerBoard((prevState) => {
        const targetBlockX = parseInt(e.target.getAttribute('data-x'));
        const targetBlockY = parseInt(e.target.getAttribute('data-y'));
        let placedShip = prevState.placeShip(
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
      setPlayerBoard((prevState) => {
        const targetShip = parseInt(e.target.getAttribute('data-shipnumber'));
        const blockId = parseInt(e.target.id);
        player.playerShips[targetShip].placed = false;
        playerBoard.removeShip(targetShip, blockId);
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

    playerBoard.gameBoardArray.forEach((arrayItem) => {
      if (arrayItem.ship && !playerShips.includes(arrayItem.ship)) {
        playerShips.push(arrayItem.ship);
      }
    });
    if (preparing && playerShips.length === 5) {
      computerBoard.placeShips();
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
    setPlayerBoard(gameboardFactory());
    setComputerBoard(gameboardFactory());
  }

  //The computer takes a turn whenever playerTurn changes (ie. whenever attacked)
  useEffect(() => {
    function computerAttack() {
      let position = 0;

      //Create a random position to attack
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

      setPlayerBoard((prevState) => {
        prevState.receiveAttack(
          position,
          parseInt(prevState.gameBoardArray[position].x),
          parseInt(prevState.gameBoardArray[position].y)
        );
        return { ...prevState };
      });

      setPlayerTurn(true);
    }

    if (!playerTurn && !gameOver) {
      //Timeout used to give the computer some fake thinking time
      setTimeout(function () {
        computerAttack();
      }, 500);
    }
    // eslint-disable-next-line
  }, [playerTurn]);

  //Checks for game over
  useEffect(() => {
    if (!preparing) {
      const computerShips = [];
      const playerShips = [];

      computerBoard.gameBoardArray.forEach((arrayItem) => {
        if (arrayItem.ship && !computerShips.includes(arrayItem.ship)) {
          computerShips.push(arrayItem.ship);
        }
      });

      playerBoard.gameBoardArray.forEach((arrayItem) => {
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
  }, [playerBoard, computerBoard, preparing]);

  return (
    <DisplayGame
      player={player}
      playerBoard={playerBoard}
      computer={computer}
      computerBoard={computerBoard}
      playerAttackHandler={playerAttackHandler}
      chooseShip={chooseShip}
      placeChosenShip={placeChosenShip}
      rotateShip={rotateShip}
      preparing={preparing}
      startGame={startGame}
      playerTurn={playerTurn}
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
