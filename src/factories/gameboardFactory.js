import shipFactory from './shipFactory';
import createGameBoardArray from '../helper_functions/createGameBoardArray';
import placeShipsHelper from '../helper_functions/placeShipsHelper';

const gameboardFactory = () => {
  let gameBoardArray = createGameBoardArray();
  const shipPositions = [];

  function getInitialState() {
    return { gameBoardArray: gameBoardArray, shipPositions: shipPositions };
  }

  function placeShip(x, y, shipLength, orientation, shipNumber, array) {
    //Create a new ship
    const newShip = shipFactory(x, y, shipLength, orientation, shipNumber);

    //If that ship was successfully created...
    if (newShip !== null) {
      const shipPositions = [...newShip.positions];
      let shipOverlap = false;

      //Check if it overlaps with any other ships
      shipPositions.forEach((currentPosition) => {
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

      //If it doesn't overlap, push it to the gameBoardArray and return true
      if (!shipOverlap) {
        shipPositions.forEach((shipPosition) => {
          array.forEach((block) => {
            const shipBlock = {
              empty: false,
              ship: newShip,
            };
            if (shipPosition.x === block.x && shipPosition.y === block.y) {
              shipBlock.x = block.x;
              shipBlock.y = block.y;
              array.splice(array.indexOf(block), 1, shipBlock);
              shipPositions.push(shipPosition);
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
    if (gameBoardArray[blockId].ship) {
      //Create an array of that ship's positions
      const shipPositions = gameBoardArray[blockId].ship.positions;

      //Check the gameBoardArray and the shipPositions array
      gameBoardArray.forEach((block) => {
        shipPositions.forEach((position) => {
          let emptyBlock = { empty: true, x: position.x, y: position.y };
          //If an index of the gameBoardArray matches the position of the clicked ship, splice it with an empty block
          if (
            block.ship &&
            block.ship.getShipNumber() === shipIndex &&
            block.x === emptyBlock.x &&
            block.y === emptyBlock.y
          ) {
            gameBoardArray.splice(gameBoardArray.indexOf(block), 1, emptyBlock);
          }
          //Then remove them from shipPositions and move onto the next
          shipPositions.forEach((playerShipPosition) => {
            if (playerShipPosition === position) {
              shipPositions.splice(
                shipPositions.indexOf(playerShipPosition, 1)
              );
            }
          });
        });
      });
    }
  }

  function receiveAttack(blockNumber, a, b) {
    let targetArrayBlock = gameBoardArray[blockNumber];
    let missBlock = { empty: false, miss: true, hit: false };
    let hitBlock = {
      empty: false,
      hit: true,
      ship: gameBoardArray[blockNumber].ship,
    };
    let sunkBlock = {
      empty: false,
      sunk: true,
      hit: true,
      ship: gameBoardArray[blockNumber].ship,
    };

    //If you click a ship...
    if (targetArrayBlock.ship) {
      //Hit it!
      targetArrayBlock.ship.hit(a, b);
      //And if that ship is sunk by you hittting it...
      if (targetArrayBlock.ship.isSunk()) {
        //Replace all relevant blocks with 'sunk ship' blocks
        gameBoardArray.forEach((block) => {
          if (block.ship === targetArrayBlock.ship) {
            gameBoardArray.splice(gameBoardArray.indexOf(block), 1, sunkBlock);
          }
        });

        //Else just replace the block you hit with a 'hit' block
      } else {
        gameBoardArray.splice(blockNumber, 1, hitBlock);
      }
    }

    //Else if you missed, replace the clicked block with a 'miss' block
    else {
      return gameBoardArray.splice(blockNumber, 1, missBlock);
    }
  }

  function placeShips() {
    placeShipsHelper(this);
  }

  return {
    gameBoardArray,
    getInitialState,
    shipPositions,
    placeShip,
    removeShip,
    receiveAttack,
    placeShips,
  };
};

export default gameboardFactory;
