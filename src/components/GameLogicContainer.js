import playerFactory from '../factories/playerFactory';
import gameboardFactory from '../factories/gameboardFactory';
import DisplayGame from './display_components/DisplayGame';
import computerAttack from '../helper_functions/computerAttack';
import { useEffect, useState } from 'react';

const GameLogicContainer = (props) => {
  const initialPlayer = gameboardFactory();
  const initialComputer = gameboardFactory();

  const [player, setPlayer] = useState(playerFactory('Player'));
  const [computer, setComputer] = useState(playerFactory('Computer'));
  const [playerBoard, setPlayerBoard] = useState(
    initialPlayer.getInitialState()
  );
  const [computerBoard, setComputerBoard] = useState(
    initialComputer.getInitialState()
  );
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
  const [playerHit, setPlayerHit] = useState(false);
  const [playerMiss, setPlayerMiss] = useState(false);

  function playerAttackHandler(e) {
    if (playerTurn && !preparing && !gameOver) {
      const newBoard = gameboardFactory(computerBoard.gameboardArray);

      if (
        newBoard.receiveAttack(
          e.target.id,
          parseInt(e.target.getAttribute('data-x')),
          parseInt(e.target.getAttribute('data-y'))
        ) === undefined
      ) {
        setPlayerHit(true);
      } else {
        setPlayerMiss(true);
      }
      setPlayerTurn(false);
      setComputerBoard(newBoard);
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
      const targetBlockX = parseInt(e.target.getAttribute('data-x'));
      const targetBlockY = parseInt(e.target.getAttribute('data-y'));
      const newBoard = gameboardFactory(playerBoard.gameboardArray);

      const shipPlacement = initialPlayer.placeShip(
        targetBlockX,
        targetBlockY,
        chosenShip.shipLength,
        chosenShip.orientation,
        shipNumber,
        newBoard.gameboardArray
      );

      if (shipPlacement === true) {
        player.playerShips[shipNumber].placed = true;
        setPlacementError(false);
        setPlacingShip(false);
      } else {
        setPlacementError(true);
      }

      setPlayerBoard(newBoard);
    }
  }

  function removeShipFromBoard(e) {
    if (preparing && !placingShip) {
      const targetShip = parseInt(e.target.getAttribute('data-shipnumber'));
      const blockId = parseInt(e.target.id);
      player.playerShips[targetShip].placed = false;
      const newState = initialPlayer;
      newState.removeShip(targetShip, blockId);
      setPlayerBoard(newState);
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

  function startGame(isRandom) {
    function gameStart() {
      const newComputer = gameboardFactory();
      const stateCopy = newComputer.getInitialState();
      initialComputer.placeShips(newComputer, newComputer.gameboardArray);
      setComputerBoard(stateCopy);
      setPreparing(false);
      setPlaceAllShipsError(false);
    }
    const playerShips = [];

    playerBoard.gameboardArray.forEach((arrayItem) => {
      if (arrayItem.ship && !playerShips.includes(arrayItem.ship)) {
        playerShips.push(arrayItem.ship);
      }
    });

    if (isRandom) {
      gameStart();
    } else if (preparing && playerShips.length === 5 && !isRandom) {
      gameStart();
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

  function placeRandomShips() {
    const randomised = true;
    const newPlayer = gameboardFactory();
    const stateCopy = newPlayer.getInitialState();
    initialPlayer.placeShips(newPlayer, newPlayer.gameboardArray);
    setPlayerBoard(stateCopy);
    startGame(randomised);
  }

  //Checks for game over
  useEffect(() => {
    if (!preparing) {
      const computerShips = [];
      const playerShips = [];

      computerBoard.gameboardArray.forEach((arrayItem) => {
        if (arrayItem.ship && !computerShips.includes(arrayItem.ship)) {
          computerShips.push(arrayItem.ship);
        }
      });

      playerBoard.gameboardArray.forEach((arrayItem) => {
        if (arrayItem.ship && !playerShips.includes(arrayItem.ship)) {
          playerShips.push(arrayItem.ship);
        }
      });

      if (computerShips.every((ship) => ship.sunk)) {
        setPlayerWins(true);
        setGameOver(true);
      }

      if (playerShips.every((ship) => ship.sunk)) {
        setPlayerWins(false);
        setGameOver(true);
      }
    }
  }, [playerBoard, computerBoard, preparing]);

  //The computer takes a turn whenever playerTurn changes (ie. whenever attacked)
  useEffect(() => {
    if (!playerTurn && !gameOver) {
      //Timeout used to give the computer some fake thinking time
      setTimeout(function () {
        computerAttack(
          setPlayerTurn,
          playerBoard,
          setPlayerBoard,
          hitPlayerBlocks,
          setHitPlayerBlocks
        );
      }, 1500);
    }
    //eslint-disable-next-line
  }, [playerTurn]);

  useEffect(() => {
    setTimeout(function () {
      if (playerHit === true) {
        setPlayerHit(false);
      } else if (playerMiss === true) {
        setPlayerMiss(false);
      }
    }, 1500);
  }, [playerHit, playerMiss]);

  return (
    <DisplayGame
      player={player}
      playerBoard={playerBoard}
      computer={computer}
      computerBoard={computerBoard}
      playerAttackHandler={playerAttackHandler}
      playerHit={playerHit}
      playerMiss={playerMiss}
      chooseShip={chooseShip}
      placeChosenShip={placeChosenShip}
      rotateShip={rotateShip}
      preparing={preparing}
      startGame={startGame}
      placeRandomShips={placeRandomShips}
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
