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

  function placeShip(x, y, shipLength) {
    const newShip = shipFactory(x, y, shipLength);
    let shipBlock = {
      empty: false,
      ship: newShip,
    };
    gameBoardArray.forEach((emptyBlock) => {
      shipBlock.ship.positions.forEach((shipPosition) => {
        if (
          shipPosition.x === emptyBlock.x &&
          shipPosition.y === emptyBlock.y
        ) {
          gameBoardArray.splice(
            gameBoardArray.indexOf(emptyBlock),
            1,
            shipBlock
          );
        }
      });
    });
  }

  function receiveAttack(coords) {
    let missBlock = { empty: false, miss: true };
    if (gameBoardArray[coords].ship) {
      console.log('hit!');
      gameBoardArray[coords].ship.hit(coords);
    } else {
      console.log('MISS!');
      gameBoardArray.splice(coords, 1, missBlock);
    }
  }

  return { gameBoardArray, placeShip, receiveAttack };
};

export default gameboardFactory;
