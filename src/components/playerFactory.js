import shipFactory from './shipFactory';

const playerFactory = (name) => {
  const getName = () => name;
  let playerShips = [];

  //Create the initial ships that the player can place
  if (name === 'Player') {
    let newShip = shipFactory(undefined, undefined, 5, 'horizontal');
    let newShip2 = shipFactory(undefined, undefined, 4, 'horizontal');
    let newShip3 = shipFactory(undefined, undefined, 3, 'horizontal');
    let newShip4 = shipFactory(undefined, undefined, 3, 'horizontal');
    let newShip5 = shipFactory(undefined, undefined, 2, 'horizontal');
    playerShips.push(newShip, newShip2, newShip3, newShip4, newShip5);
  }

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

  return {
    getName,
    playerShips,
    rotateHorizontalShip,
    rotateVerticalShip,
  };
};

export default playerFactory;
