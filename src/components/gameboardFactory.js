import shipFactory from './shipFactory';

const gameboardFactory = () => {
  const gameBoardArray = [];

  let loopCounter = 0;

  const pushToBoard = (() => {
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

      let emptyBlock = { empty: true, x: setX(), y: setY(), blockNumber: i };

      gameBoardArray.push(emptyBlock);
    }
  })();

  function placeShip(x, y, shipLength, orientation) {
    const newShip = shipFactory(x, y, shipLength, orientation);

    let shipBlock = {
      empty: false,
      ship: newShip,
    };

    function addTheShip(shipToAdd) {
      gameBoardArray.forEach((emptyBlock) => {
        if (shipToAdd.ship !== null) {
          shipToAdd.ship.positions.forEach((shipPosition) => {
            if (
              shipPosition.x === emptyBlock.x &&
              shipPosition.y === emptyBlock.y
            ) {
              gameBoardArray.splice(
                gameBoardArray.indexOf(emptyBlock),
                1,
                shipToAdd
              );
            }
          });
        }
      });
    }
    addTheShip(shipBlock);
  }

  function receiveAttack(blockNumber, a, b) {
    console.log(blockNumber);
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
      gameBoardArray.splice(blockNumber, 1, missBlock);
    }
  }

  function listShips() {
    gameBoardArray.forEach((block) => {
      if (block.ship) {
        return block;
      }
    });
  }

  return { gameBoardArray, placeShip, receiveAttack, listShips };
};

export default gameboardFactory;
