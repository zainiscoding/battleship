import gameboardFactory from './gameboardFactory';

const playerFactory = (name) => {
  const playerBoard = gameboardFactory();

  function makePlay(position) {
    if (position !== undefined) {
      playerBoard.placeShip(position, 3);
    } else {
      playerBoard.placeShip(Math.random() * 10, 3);
    }
  }

  return { playerBoard, name, makePlay };
};

export default playerFactory;
