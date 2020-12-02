import gameboardFactory from './gameboardFactory';
import shipFactory from './shipFactory';

const playerFactory = (name) => {
  const getName = () => name;
  const playerBoard = gameboardFactory();

  let newShip = shipFactory(undefined, undefined, 5, 'horizontal');
  let newShip2 = shipFactory(undefined, undefined, 4, 'horizontal');
  let newShip3 = shipFactory(undefined, undefined, 3, 'horizontal');
  let newShip4 = shipFactory(undefined, undefined, 3, 'horizontal');
  let newShip5 = shipFactory(undefined, undefined, 2, 'horizontal');
  const playerShips = [];
  playerShips.push(newShip, newShip2, newShip3, newShip4, newShip5);

  //It's possible to consolidate the following two rotation functions into one, but requires React to not run in Strict Mode.
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

  function removeShip(shipIndex) {
    console.log(
      playerShips.filter((ship) => playerShips.indexOf(ship) === shipIndex)
    );
  }
  //check CV builder

  function makePlay(toAttack, x, y, length) {
    let randomPosition = Math.floor(Math.random() * 100);
    if (x !== undefined) {
      toAttack.placeShip(x, y, length);
    } else {
      toAttack.receiveAttack(randomPosition);
    }
  }

  return {
    getName,
    playerBoard,
    makePlay,
    removeShip,
    playerShips,
    rotateHorizontalShip,
    rotateVerticalShip,
  };
};

export default playerFactory;
