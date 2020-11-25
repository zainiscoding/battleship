import gameboardFactory from './gameboardFactory';
import shipFactory from './shipFactory';

const playerFactory = (name) => {
  const playerBoard = gameboardFactory();

  let newShip = shipFactory(undefined, undefined, 3, 'horizontal');
  let newShip2 = shipFactory(undefined, undefined, 5, 'horizontal');
  let newShip3 = shipFactory(undefined, undefined, 6, 'horizontal');
  const playerShipsStart = [newShip, newShip2, newShip3];

  console.log(playerShipsStart);
  console.log(typeof playerShipsStart);

  function makePlay(toAttack, x, y, length) {
    let randomPosition = Math.floor(Math.random() * 100);
    if (x !== undefined) {
      toAttack.placeShip(x, y, length);
    } else {
      toAttack.receiveAttack(randomPosition);
    }
  }

  return { playerBoard, name, makePlay, playerShipsStart };
};

export default playerFactory;
