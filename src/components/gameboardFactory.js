import shipFactory from './shipFactory';

const gameboardFactory = () => {
  let gameBoardArray = [];
  const playerShipPositions = [];

  let loopCounter = 0;

  for (let i = 0; i < 100; i++) {
    let x = i;
    let y = 9;

    function setX() {
      if (i > 9) {
        return (x = i % 10);
      } else {
        return x;
      }
    }

    function setY() {
      if (i % 10 === 0 && i > 9) {
        loopCounter += 1;
      }
      return y - loopCounter;
    }

    let emptyBlock = { empty: true, x: setX(), y: setY() };

    gameBoardArray.push(emptyBlock);
  }

  function placeShip(x, y, shipLength, orientation, shipNumber) {
    const newShip = shipFactory(x, y, shipLength, orientation, shipNumber);

    if (newShip !== null) {
      const shipPositions = [...newShip.positions];
      let shipOverlap = false;

      playerShipPositions.forEach((currentPosition) => {
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
      if (!shipOverlap) {
        shipPositions.forEach((shipPosition) => {
          gameBoardArray.forEach((block) => {
            const shipBlock = {
              empty: false,
              ship: newShip,
            };
            if (shipPosition.x === block.x && shipPosition.y === block.y) {
              shipBlock.x = block.x;
              shipBlock.y = block.y;
              gameBoardArray.splice(
                gameBoardArray.indexOf(block),
                1,
                shipBlock
              );
              playerShipPositions.push(shipPosition);
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
    if (gameBoardArray[blockId].ship) {
      const shipPositions = gameBoardArray[blockId].ship.positions;
      gameBoardArray.forEach((block) => {
        shipPositions.forEach((position) => {
          let emptyBlock = { empty: true, x: position.x, y: position.y };
          if (block.ship && block.ship.getShipNumber() === shipIndex) {
            gameBoardArray.splice(gameBoardArray.indexOf(block), 1, emptyBlock);
          }
          playerShipPositions.forEach((playerShipPosition) => {
            if (playerShipPosition === position) {
              playerShipPositions.splice(
                playerShipPositions.indexOf(playerShipPositions, 1)
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

  function listShips() {
    gameBoardArray.forEach((block) => {
      if (block.ship) {
        return block;
      }
    });
  }

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
        newShip.orientation = orientationGenerator();
      }
      return newShip;
    }

    const newShip = generateShipPlacement(2);
    const newShip2 = generateShipPlacement(3);
    const newShip3 = generateShipPlacement(3);
    const newShip4 = generateShipPlacement(4);
    const newShip5 = generateShipPlacement(5);

    let newComputerState = this;
    console.log(newComputerState);

    function placeShipArguments(ship) {
      return [ship.x, ship.y, ship.length, ship.orientation];
    }

    const placeShip1 = newComputerState.placeShip(
      ...placeShipArguments(newShip)
    );

    const placeShip2 = newComputerState.placeShip(
      ...placeShipArguments(newShip2)
    );

    const placeShip3 = newComputerState.placeShip(
      ...placeShipArguments(newShip3)
    );

    const placeShip4 = newComputerState.placeShip(
      ...placeShipArguments(newShip4)
    );

    const placeShip5 = newComputerState.placeShip(
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
        ship = newComputerState.placeShip(
          replacementShip.x,
          replacementShip.y,
          replacementShip.length,
          replacementShip.orientation
        );
        // setComputer(newComputerState);
      }
    });

    // setComputer(newComputerState);
    // setComputer((newComputerState) => {
    //   return { ...newComputerState };
    // });
  }

  return {
    gameBoardArray,
    playerShipPositions,
    placeShip,
    removeShip,
    receiveAttack,
    placeComputerShips,
    listShips,
  };
};

export default gameboardFactory;