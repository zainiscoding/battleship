import playerFactory from '../factories/playerFactory';
import gameboardFactory from '../factories/gameboardFactory';
import DisplayGame from './display_components/DisplayGame';
import computerAttack from '../helper_functions/computerAttack';
import { useEffect, useState } from 'react';

let placingShip = false;
let shipNumber = 0;
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
    const newPlayerArray = [...player];
    const newPlayerState = playerFactory('Player', newPlayerArray);
    const targetShipNumber = parseInt(e.target.getAttribute('data-shipnumber'));
    const newChosenShip = {
      shipLength: parseInt(e.target.getAttribute('data-length')),
      orientation: e.target.getAttribute('data-orientation'),
      shipNumber: targetShipNumber,
    };

    shipNumber = targetShipNumber;
    newPlayerState.highlightShip(shipNumber);
    setPlayer(newPlayerState.getInitialState());
    setChosenShip(newChosenShip);
    placingShip = true;
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
        const newPlayerArray = [...player];
        const newPlayerState = playerFactory('Player', newPlayerArray);

        newPlayerState.switchShipPlacement(shipNumber);
        placingShip = false;
        setPlayer(newPlayerState.getInitialState());
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
      const newArray = [...playerBoard.gameboardArray];
      const newShips = [...playerBoard.playerShipPositions];
      const newPlayerArray = [...player];
      const newBoardState = gameboardFactory(newArray, newShips);
      const newPlayerState = playerFactory('Player', newPlayerArray);

      newPlayerState.switchShipPlacement(targetShipNumber);
      newBoardState.removeShip(targetShipNumber, blockId);

      setPlayerBoard(newBoardState.getInitialState());
      setPlayer(newPlayerState.getInitialState());
    }
  }

  function rotateShips() {
    const newPlayerArray = [...player];
    const newPlayerState = playerFactory('Player', newPlayerArray);

    console.log(player);
    newPlayerState.rotateShips();
    setPlayer(newPlayerState.getInitialState());
  }

  function placeRandomShips() {
    const newPlayer = gameboardFactory();
    const stateCopy = newPlayer.getInitialState();
    placingShip = false;
    newPlayer.placeShips(newPlayer, newPlayer.gameboardArray);
    setPlayerBoard(stateCopy);
    startGame(true);
  }

  function startGame(isRandom) {
    function gameStart() {
      const newComputerBoard = gameboardFactory();
      const newComputerBoardState = newComputerBoard.getInitialState();
      newComputerBoard.placeShips(
        newComputerBoard,
        newComputerBoard.gameboardArray
      );
      setComputerBoard(newComputerBoardState);
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
    const newPlayerBoard = gameboardFactory();
    const newComputerBoard = gameboardFactory();
    preparing = true;
    gameOver = false;
    setPlayerTurn(true);
    setHitPlayerBlocks([]);
    setComputerHealth(5);
    setPlayerWins('');
    setPlayer(initialPlayer.getInitialState());
    setComputer(initialComputer.getInitialState());
    setPlayerBoard(newPlayerBoard.getInitialState());
    setComputerBoard(newComputerBoard.getInitialState());
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
      }, 1500);
    }
    //eslint-disable-next-line
  }, [playerTurn]);

  useEffect(() => {
    setTimeout(function () {
      console.log('happening');
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
      rotateShips={rotateShips}
      preparing={preparing}
      startGame={startGame}
      placeRandomShips={placeRandomShips}
      playerTurn={playerTurn}
      restartGame={restartGame}
      removeShipFromBoard={removeShipFromBoard}
      playerWins={playerWins}
      gameOver={gameOver}
    />
  );
};

export default GameLogicContainer;
