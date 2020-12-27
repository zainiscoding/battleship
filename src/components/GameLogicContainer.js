import playerFactory from '../factories/playerFactory';
import gameboardFactory from '../factories/gameboardFactory';
import DisplayGame from './display_components/DisplayGame';
import computerAttack from '../helper_functions/computerAttack';
import { useEffect, useState } from 'react';

let placingShip = false;
let shipNumber = 0;
let placementError = false;
let preparing = true;
let gameOver = false;

const GameLogicContainer = (props) => {
  const initialPlayerBoard = gameboardFactory();
  const initialComputerBoard = gameboardFactory();
  const initialPlayer = playerFactory('Player');
  const initialComputer = playerFactory('Computer');

  const [player, setPlayer] = useState(initialPlayer.getInitialState());
  const [computer, setComputer] = useState(initialComputer.getInitialState());

  const [playerBoard, setPlayerBoard] = useState(
    initialPlayerBoard.getInitialState()
  );
  const [computerBoard, setComputerBoard] = useState(
    initialComputerBoard.getInitialState()
  );
  const [chosenShip, setChosenShip] = useState('');
  const [computerHealth, setComputerHealth] = useState(5);
  const [hitPlayerBlocks, setHitPlayerBlocks] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(true);
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
      } else if (
        newBoard.receiveAttack(
          e.target.id,
          parseInt(e.target.getAttribute('data-x')),
          parseInt(e.target.getAttribute('data-y'))
        ) === 'sunk'
      ) {
        setPlayerHit(true);
        setComputerHealth(computerHealth - 1);
      } else {
        setPlayerMiss(true);
      }
      setPlayerTurn(false);
      setComputerBoard(newBoard.getInitialState());
    }
  }

  function chooseShip(e) {
    if (!placingShip) {
      const newChosenShip = {
        shipLength: parseInt(e.target.getAttribute('data-length')),
        orientation: e.target.getAttribute('data-orientation'),
      };
      setChosenShip(newChosenShip);
      placingShip = true;
      shipNumber = parseInt(e.target.getAttribute('data-shipnumber'));
      e.target.parentNode.className += '--selected';
    }
  }

  function placeChosenShip(e) {
    if (placingShip) {
      const targetBlockX = parseInt(e.target.getAttribute('data-x'));
      const targetBlockY = parseInt(e.target.getAttribute('data-y'));

      const newArray = [...playerBoard.gameboardArray];
      const newShips = [...playerBoard.playerShipPositions];
      const newBoard = gameboardFactory(newArray, newShips);

      const shipPlacement = newBoard.placeShip(
        targetBlockX,
        targetBlockY,
        chosenShip.shipLength,
        chosenShip.orientation,
        shipNumber,
        newBoard.gameboardArray
      );

      if (shipPlacement === true) {
        const newPlayerState = playerFactory('Player', player);

        newPlayerState.switchShipPlacement(shipNumber);
        placementError = false;
        placingShip = false;
        setPlayer(newPlayerState.getInitialState());
      } else {
        placementError = true;
      }
      setPlayerBoard(newBoard.getInitialState());
    }
  }

  function removeShipFromBoard(e) {
    if (preparing && !placingShip) {
      const targetShipNumber = parseInt(
        e.target.getAttribute('data-shipnumber')
      );
      const blockId = parseInt(e.target.id);
      const newBoardState = gameboardFactory(playerBoard.gameboardArray);
      const newPlayerState = playerFactory('Player', player);

      newPlayerState.switchShipPlacement(targetShipNumber);
      newBoardState.removeShip(targetShipNumber, blockId);

      setPlayerBoard(newBoardState);
      setPlayer(newPlayerState.getInitialState());
    }
  }

  function rotateShip(e) {
    e.stopPropagation();
    if (placingShip) {
      const newChosenShip = {
        shipLength: chosenShip.shipLength,
        orientation: chosenShip.orientation,
      };
      const orientation = chosenShip.orientation;

      orientation === 'horizontal'
        ? (newChosenShip.orientation = 'vertical')
        : (newChosenShip.orientation = 'horizontal');
      setChosenShip(newChosenShip);
    }

    const newPlayerState = playerFactory('Player', player);
    const targetShipNumber = e.target.parentNode.getAttribute(
      'data-shipnumber'
    );
    const orientation = e.target.parentNode.getAttribute('data-orientation');

    orientation === 'horizontal'
      ? newPlayerState.rotateHorizontalShip(targetShipNumber)
      : newPlayerState.rotateVerticalShip(targetShipNumber);

    setPlayer(newPlayerState.getInitialState());
  }

  function placeRandomShips() {
    placingShip = false;
    const newPlayer = gameboardFactory();
    const stateCopy = newPlayer.getInitialState();
    initialPlayerBoard.placeShips(newPlayer, newPlayer.gameboardArray);
    setPlayerBoard(stateCopy);
    startGame(true);
  }

  function startGame(isRandom) {
    function gameStart() {
      const newComputer = gameboardFactory();
      const stateCopy = newComputer.getInitialState();
      initialComputerBoard.placeShips(newComputer, newComputer.gameboardArray);
      setComputerBoard(stateCopy);
      preparing = false;
    }

    const playerShips = playerBoard.gameboardArray.filter((arrayItem) => {
      return arrayItem.ship;
    });

    if (isRandom === true) {
      gameStart();
    } else if (playerShips.length === 17) {
      gameStart();
    } else {
    }
  }

  function restartGame() {
    preparing = true;
    setPlayerTurn(true);
    setHitPlayerBlocks([]);
    setComputerHealth(5);
    gameOver = false;
    setPlayerWins('');
    setPlayer(initialPlayer.getInitialState());
    setComputer(initialComputer.getInitialState());
    setPlayerBoard(gameboardFactory());
    setComputerBoard(gameboardFactory());
  }

  //Checks for game over
  useEffect(() => {
    const computerShips = computerBoard.gameboardArray.filter((arrayItem) => {
      return arrayItem.ship;
    });

    const playerShips = playerBoard.gameboardArray.filter((arrayItem) => {
      return arrayItem.ship;
    });

    if (playerShips.length > 0 && computerShips.length > 0) {
      if (computerShips.every((ship) => ship.sunk)) {
        setPlayerWins(true);
        gameOver = true;
      }

      if (playerShips.every((ship) => ship.sunk)) {
        setPlayerWins(false);
        gameOver = true;
      }
    }
  }, [playerBoard, computerBoard]);

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
      }, 0);
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
      computerHealth={computerHealth}
      playerAttackHandler={playerAttackHandler}
      playerHit={playerHit}
      playerMiss={playerMiss}
      chooseShip={chooseShip}
      chosenShip={chosenShip}
      placingShip={placingShip}
      placeChosenShip={placeChosenShip}
      rotateShip={rotateShip}
      preparing={preparing}
      startGame={startGame}
      placeRandomShips={placeRandomShips}
      playerTurn={playerTurn}
      restartGame={restartGame}
      removeShipFromBoard={removeShipFromBoard}
      placementError={placementError}
      playerWins={playerWins}
      gameOver={gameOver}
    />
  );
};

export default GameLogicContainer;
