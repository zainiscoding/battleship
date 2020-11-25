import gameboardFactory from './gameboardFactory';

const playerFactory = (name) => {
  const playerBoard = gameboardFactory();

  function makePlay(toAttack, x, y, length) {
    let randomPosition = Math.floor(Math.random() * 100);
    if (x !== undefined) {
      toAttack.placeShip(x, y, length);
    } else {
      toAttack.receiveAttack(randomPosition);
    }
  }

  return { playerBoard, name, makePlay };
};

export default playerFactory;
