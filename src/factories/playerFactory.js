import createShipPositionsArray from '../helper_functions/createShipPositionsArray';

const playerFactory = (name, playerShipsArray) => {
  let playerShips = [];

  if (playerShipsArray) {
    playerShips = playerShipsArray;
  } else {
    //Create the initial ships that the player can place
    if (name === 'Player') {
      const shipFactory = (length) => {
        return {
          x: undefined,
          y: undefined,
          shipLength: length,
          orientation: 'horizontal',
          placed: false,
          positionsArray: [],
        };
      };

      const newShip = shipFactory(5);
      const newShip2 = shipFactory(4);
      const newShip3 = shipFactory(3);
      const newShip4 = shipFactory(3);
      const newShip5 = shipFactory(2);

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

  function getInitialState() {
    return [...playerShips];
  }

  //It's possible to consolidate the following two rotation functions into one, but requires React to not run in Strict Mode.
  function rotateHorizontalShip(shipIndex) {
    const newVerticalShip = {
      x: playerShips[shipIndex].x,
      y: playerShips[shipIndex].y,
      shipLength: playerShips[shipIndex].shipLength,
      orientation: 'vertical',
      placed: false,
      positionsArray: playerShips[shipIndex].positionsArray,
    };
    return playerShips.splice(shipIndex, 1, newVerticalShip);
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

  function switchShipPlacement(shipIndex) {
    if (playerShips[shipIndex].placed === true) {
      playerShips[shipIndex].placed = false;
    } else {
      return (playerShips[shipIndex].placed = true);
    }
  }

  return {
    getInitialState,
    rotateHorizontalShip,
    rotateVerticalShip,
    switchShipPlacement,
  };
};

export default playerFactory;
