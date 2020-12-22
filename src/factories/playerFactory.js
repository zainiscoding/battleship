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
      let newShip2 = {
        x: undefined,
        y: undefined,
        shipLength: 4,
        orientation: 'horizontal',
        placed: false,
        positionsArray: [],
      };
      let newShip3 = {
        x: undefined,
        y: undefined,
        shipLength: 3,
        orientation: 'horizontal',
        placed: false,
        positionsArray: [],
      };
      let newShip4 = {
        x: undefined,
        y: undefined,
        shipLength: 3,
        orientation: 'horizontal',
        placed: false,
        positionsArray: [],
      };
      let newShip5 = {
        x: undefined,
        y: undefined,
        shipLength: 2,
        orientation: 'horizontal',
        placed: false,
        positionsArray: [],
      };
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
    };
    return playerShips.splice(shipIndex, 1, newVerticalShip);
  }

  function rotateVerticalShip(shipIndex) {
    const newHorizontalShip = {
      x: playerShips[shipIndex].x,
      y: playerShips[shipIndex].y,
      shipLength: playerShips[shipIndex].length,
      orientation: 'horizontal',
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
