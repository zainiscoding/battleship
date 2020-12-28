import createGameboardArray from '../helper_functions/createGameboardArray';
import placeShipsHelper from '../helper_functions/placeShipsHelper';

const gameboardFactory = (gameBoard, playerShips) => {
  let gameboardArray = createGameboardArray();
  let playerShipPositions = [];

  if (gameBoard) {
    gameboardArray = gameBoard;
  }
  if (playerShips) {
    playerShipPositions = playerShips;
  }

  function getInitialState() {
    return {
      gameboardArray: gameboardArray,
      playerShipPositions: this.playerShipPositions,
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
    //Prevents placement of impossible ships (not enough space)
    if (
      (x !== null && x + shipLength > 10 && orientation === 'horizontal') ||
      (y - shipLength < -1 && orientation === 'vertical')
    ) {
      return null;
    }
    //Create a new ship
    const newShip = { x, y, shipLength, orientation, shipNumber };
    newShip.positionsArray = [];

    if (orientation === 'horizontal') {
      for (let i = 0; i < shipLength; i++) {
        const newPosition = { x: x + i, y: y, hit: false };
        newShip.positionsArray.push(newPosition);
      }
    } else {
      for (let i = 0; i < shipLength; i++) {
        const newPosition = { x: x, y: y - i, hit: false };
        newShip.positionsArray.push(newPosition);
      }
    }

    //If that ship was successfully created...
    if (newShip !== null) {
      if (playerShips) {
        this.playerShipPositions = playerShips;
      }

      const shipPositions = [...newShip.positionsArray];
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
              ship: {
                x: x,
                y: y,
                shipLength: shipLength,
                orientation: orientation,
                shipNumber: shipNumber,
                positionsArray: newShip.positionsArray,
              },
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
      const shipPositions = gameboardArray[blockId].ship.positionsArray;

      //Check the gameboardArray and the shipPositions array
      gameboardArray.forEach((block) => {
        shipPositions.forEach((position) => {
          let emptyBlock = { empty: true, x: position.x, y: position.y };
          //If an index of the gameboardArray matches the position of the clicked ship, splice it with an empty block
          if (
            block.ship &&
            block.ship.shipNumber === shipIndex &&
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
    let targetShip = gameboardArray[blockNumber].ship;

    let missBlock = { empty: false, miss: true, hit: false };
    let hitBlock = {
      empty: false,
      hit: true,
      ship: targetShip,
    };
    let sunkBlock = {
      empty: false,
      sunk: true,
      hit: true,
      ship: targetShip,
    };

    //If you click a ship...
    if (targetShip) {
      //Create a ship and hit it
      let newShip = {
        positionsArray: targetShip.positionsArray,
        hit: function hit() {
          this.positionsArray.forEach((shipBlock) => {
            if (shipBlock.x === a && shipBlock.y === b) {
              this.positionsArray.splice(
                this.positionsArray.indexOf(shipBlock),
                1,
                {
                  x: shipBlock.x,
                  y: shipBlock.y,
                  hit: true,
                }
              );
            }
          });
        },
        isSunk: function isSunk() {
          return this.positionsArray.every((block) => block.hit);
        },
      };

      newShip.hit(a, b);
      //And if that ship is sunk by you hitting it...
      if (newShip.isSunk()) {
        //Replace all relevant blocks with 'sunk ship' blocks
        gameboardArray.forEach((block) => {
          if (block.ship) {
            if (block.ship.positionsArray === newShip.positionsArray) {
              gameboardArray.splice(
                gameboardArray.indexOf(block),
                1,
                sunkBlock
              );
            }
          }
        });
        return 'sunk';

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
