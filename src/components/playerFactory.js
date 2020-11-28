import gameboardFactory from './gameboardFactory';
import shipFactory from './shipFactory';

const playerFactory = (name) => {
  const playerBoard = gameboardFactory();

  let newShip = shipFactory(undefined, undefined, 3, 'horizontal');
  let newShip2 = shipFactory(undefined, undefined, 5, 'horizontal');
  let newShip3 = shipFactory(undefined, undefined, 6, 'horizontal');
  const playerShips = [];
  playerShips.push(newShip, newShip2, newShip3);

  function rotateHorizontalShip(shipIndex) {
    const newVerticalShip = shipFactory(
      playerShips[shipIndex].x,
      playerShips[shipIndex].y,
      playerShips[shipIndex].getShipLength(),
      'vertical'
    );
    return playerShips.splice(shipIndex, 1, newVerticalShip);
  }

  function rotateVerticalShip(shipIndex) {
    const newHorizontalShip = shipFactory(
      playerShips[shipIndex].x,
      playerShips[shipIndex].y,
      playerShips[shipIndex].getShipLength(),
      'horizontal'
    );
    return playerShips.splice(shipIndex, 1, newHorizontalShip);
  }

  function rotateShip(shipIndex) {
    const orientation =
      playerShips[shipIndex].getOrientation() === 'horizontal'
        ? 'vertical'
        : 'horizontal'; // we reverse the orientation here
    const newShip = shipFactory(
      playerShips[shipIndex].x,
      playerShips[shipIndex].y,
      playerShips[shipIndex].getShipLength(),
      orientation // here will be the right orientation we need (reversed)
    );
    return playerShips.splice(shipIndex, 1, newShip); // no need for second block
  }

  function makePlay(toAttack, x, y, length) {
    let randomPosition = Math.floor(Math.random() * 100);
    if (x !== undefined) {
      toAttack.placeShip(x, y, length);
    } else {
      toAttack.receiveAttack(randomPosition);
    }
  }

  return {
    playerBoard,
    name,
    makePlay,
    playerShips,
    rotateShip,
    rotateHorizontalShip,
    rotateVerticalShip,
  };
};

export default playerFactory;
