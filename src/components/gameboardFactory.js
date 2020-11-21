import shipFactory from './shipFactory';

const gameboardFactory = (size) => {
  const gameBoardArray = [];

  for (let i = 0; i < size; i++) {
    // let emptyBlock = { coords: i, empty: true };
    let emptyBlock = { empty: true };
    gameBoardArray.push(emptyBlock);
  }

  function placeShip(coords, shipLength) {
    const newShip = shipFactory(shipLength);
    for (let i = 0; i < shipLength; i++) {
      let shipBlock = {
        start: coords,
        end: coords + shipLength - 1,
        empty: false,
        ship: newShip,
      };
      gameBoardArray.splice(coords, 1, shipBlock);
      coords++;
    }
  }

  return { gameBoardArray, placeShip };
};

export default gameboardFactory;
