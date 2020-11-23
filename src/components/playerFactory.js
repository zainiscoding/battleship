import gameboardFactory from './gameboardFactory';

const playerFactory = (name) => {
  const playerBoard = gameboardFactory();

  function makePlay(position) {
    let randomPosition = Math.random() * 10;
    if (position !== undefined) {
      playerBoard.placeShip(position, 3);
    } else {
      playerBoard.placeShip(randomPosition, randomPosition + 1, 3);
    }
  }

  return { playerBoard, name, makePlay };
};

export default playerFactory;
