import shipFactory from './shipFactory';

const gameboardFactory = () => {
  const gameBoardArray = [];

  for (let i = 0; i < 100; i++) {
    // let emptyBlock = { coords: i, empty: true };
    let emptyBlock = { empty: true };
    gameBoardArray.push(emptyBlock);
  }

  function placeShip(coords, shipLength) {
    const newShip = shipFactory(coords, shipLength);
    for (let i = 0; i < shipLength; i++) {
      let shipBlock = {
        empty: false,
        ship: newShip,
      };
      gameBoardArray.splice(coords, 1, shipBlock);
      coords++;
    }
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
