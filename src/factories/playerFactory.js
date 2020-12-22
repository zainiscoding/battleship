import createShipPositionsArray from '../helper_functions/createShipPositionsArray';

const playerFactory = (name, playerShipsArray) => {
  let playerShips = [];

  if (playerShipsArray) {
    playerShips = playerShipsArray;
  } else {
    //Create the initial ships that the player can place
    if (name === 'Player') {
      let newShip = {
        x: undefined,
        y: undefined,
        shipLength: 5,
        orientation: 'horizontal',
        placed: false,
        positionsArray: [],
      };

      let newShip2 = JSON.parse(JSON.stringify(newShip));
      newShip2.shipLength = 4;

      let newShip3 = JSON.parse(JSON.stringify(newShip));
      newShip3.shipLength = 3;

      let newShip4 = JSON.parse(JSON.stringify(newShip));
      newShip4.shipLength = 3;

      let newShip5 = JSON.parse(JSON.stringify(newShip));
      newShip5.shipLength = 2;

      playerShips.push(newShip, newShip2, newShip3, newShip4, newShip5);
      playerShips.forEach((ship) => {
        createShipPositionsArray(
          ship.x,
          ship.y,
          ship.orientation,
          ship.shipLength,
          ship.positions,
          ship.positionsArray
        );
      });
    }
  }

  //It's possible to consolidate the following two rotation functions into one, but requires React to not run in Strict Mode.
  function rotateHorizontalShip(shipIndex) {
    const newVerticalShip = {
      x: playerShips[shipIndex].x,
      y: playerShips[shipIndex].y,
      shipLength: playerShips[shipIndex].length,
      orientation: 'vertical',
      placed: false,
      positionsArray: playerShips[shipIndex].positionsArray,
    };
    playerShips.splice(shipIndex, 1, newVerticalShip);
  }

  function rotateVerticalShip(shipIndex) {
    const newHorizontalShip = {
      x: playerShips[shipIndex].x,
      y: playerShips[shipIndex].y,
      shipLength: playerShips[shipIndex].length,
      orientation: 'horizontal',
      placed: false,
      positionsArray: playerShips[shipIndex].positionsArray,
    };
    return playerShips.splice(shipIndex, 1, newHorizontalShip);
  }

  return {
    playerShips,
    rotateHorizontalShip,
    rotateVerticalShip,
  };
};

export default playerFactory;
