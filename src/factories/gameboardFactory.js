import shipFactory from './shipFactory';
import createGameboardArray from '../helper_functions/createGameboardArray';
import placeShipsHelper from '../helper_functions/placeShipsHelper';

const gameboardFactory = (gameBoard) => {
  let gameboardArray = [];

  if (gameBoard) {
    gameboardArray = gameBoard;
  } else {
    gameboardArray = createGameboardArray();
  }

  const playerShipPositions = [];

  function getInitialState() {
    return {
      gameboardArray: gameboardArray,
      playerShipPositions: playerShipPositions,
    };
  }

  function placeShip(
    x,
    y,
    shipLength,
    orientation,
    shipNumber,
    gameboardArray
  ) {
    //Create a new ship
    const newShip = shipFactory(x, y, shipLength, orientation, shipNumber);

    //If that ship was successfully created...
    if (newShip !== null) {
      const shipPositions = [...newShip.positions];
      let shipOverlap = false;

      //Check if it overlaps with any other ships
      this.playerShipPositions.forEach((currentPosition) => {
        if (
          shipPositions.some(
            (position) =>
              position.x === currentPosition.x &&
              position.y === currentPosition.y
          )
        ) {
          return (shipOverlap = true);
        }
      });

      //If it doesn't overlap, push it to the gameboardArray and return true
      if (!shipOverlap) {
        shipPositions.forEach((shipPosition) => {
          gameboardArray.forEach((block) => {
            const shipBlock = {
              empty: false,
              ship: newShip,
            };
            if (shipPosition.x === block.x && shipPosition.y === block.y) {
              shipBlock.x = block.x;
              shipBlock.y = block.y;
              gameboardArray.splice(
                gameboardArray.indexOf(block),
                1,
                shipBlock
              );
              this.playerShipPositions.push(shipPosition);
            }
          });
        });
        return true;
      } else {
        return newShip;
      }
    }
  }

  function removeShip(shipIndex, blockId) {
    //If you clicked a ship...
    if (gameboardArray[blockId].ship) {
      //Create an array of that ship's positions
      const shipPositions = gameboardArray[blockId].ship.positions;

      //Check the gameboardArray and the shipPositions array
      gameboardArray.forEach((block) => {
        shipPositions.forEach((position) => {
          let emptyBlock = { empty: true, x: position.x, y: position.y };
          //If an index of the gameboardArray matches the position of the clicked ship, splice it with an empty block
          if (
            block.ship &&
            block.ship.getShipNumber() === shipIndex &&
            block.x === emptyBlock.x &&
            block.y === emptyBlock.y
          ) {
            gameboardArray.splice(gameboardArray.indexOf(block), 1, emptyBlock);
          }
          //Then remove them from playerShipPositions and move onto the next
          playerShipPositions.forEach((playerShipPosition) => {
            if (playerShipPosition === position) {
              playerShipPositions.splice(
                playerShipPositions.indexOf(playerShipPosition, 1)
              );
            }
          });
        });
      });
    }
  }

  function receiveAttack(blockNumber, a, b) {
    let targetArrayBlock = gameboardArray[blockNumber];
    let missBlock = { empty: false, miss: true, hit: false };
    let hitBlock = {
      empty: false,
      hit: true,
      ship: gameboardArray[blockNumber].ship,
    };
    let sunkBlock = {
      empty: false,
      sunk: true,
      hit: true,
      ship: gameboardArray[blockNumber].ship,
    };

    //If you click a ship...
    if (targetArrayBlock.ship) {
      //Hit it!
      targetArrayBlock.ship.hit(a, b);
      //And if that ship is sunk by you hittting it...
      if (targetArrayBlock.ship.isSunk()) {
        //Replace all relevant blocks with 'sunk ship' blocks
        gameboardArray.forEach((block) => {
          if (block.ship === targetArrayBlock.ship) {
            gameboardArray.splice(gameboardArray.indexOf(block), 1, sunkBlock);
          }
        });

        //Else just replace the block you hit with a 'hit' block
      } else {
        gameboardArray.splice(blockNumber, 1, hitBlock);
      }
    }

    //Else if you missed, replace the clicked block with a 'miss' block
    else {
      return gameboardArray.splice(blockNumber, 1, missBlock);
    }
  }

  function placeShips(board, array) {
    placeShipsHelper(board, array);
  }

  return {
    gameboardArray,
    getInitialState,
    playerShipPositions,
    placeShip,
    removeShip,
    receiveAttack,
    placeShips,
  };
};

export default gameboardFactory;
