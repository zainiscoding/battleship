import gameboardFactory from './gameboardFactory';

const playerFactory = (name) => {
  const playerBoard = gameboardFactory();

  function makePlay(x, y, length) {
    let randomPosition = Math.random() * 10;
    if (x !== undefined) {
      playerBoard.placeShip(x, y, length);
    } else {
      playerBoard.placeShip(randomPosition, randomPosition + 1, 3);
    }
  }

  return { playerBoard, name, makePlay };
};

export default playerFactory;
