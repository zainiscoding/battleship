import shipFactory from './shipFactory';

const gameboardFactory = () => {
  const gameBoardArray = [];

  let loopCounter = 0;
  function pushToBoard() {
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
      // if (i > 99) {
      //   return y - 10;
      // } else if (i > 89) {
      //   return y - 9;
      // } else if (i > 79) {
      //   return y - 8;
      // } else if (i > 69) {
      //   return y - 7;
      // } else if (i > 59) {
      //   return y - 6;
      // } else if (i > 49) {
      //   return y - 5;
      // } else if (i > 39) {
      //   return y - 4;
      // } else if (i > 29) {
      //   return y - 3;
      // } else if (i > 19) {
      //   return y - 2;
      // } else if (i > 9) {
      //   return y - 1;
      // } else {
      //   return y;
      // }

      let emptyBlock = { empty: true, x: setX(), y: setY() };

      gameBoardArray.push(emptyBlock);
    }
  }
  pushToBoard();

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
    if (x === gameBoardArray) console.log(gameBoardArray);
  }

  function receiveAttack(coords) {
    let missBlock = { empty: false, miss: true };
    if (gameBoardArray[coords].ship) {
      gameBoardArray[coords].ship.hit(coords);
    } else {
      gameBoardArray.splice(coords, 1, missBlock);
    }
  }

  return { gameBoardArray, placeShip, receiveAttack };
};

export default gameboardFactory;
