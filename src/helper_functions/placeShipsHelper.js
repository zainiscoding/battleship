function xGenerator() {
  let x = Math.floor(Math.random() * 10);
  return x;
}

function yGenerator() {
  let y = Math.floor(Math.random() * 10);
  return y;
}

function orientationGenerator() {
  let orientationNumber = Math.floor(Math.random() * 10);
  if (orientationNumber % 2 === 0) {
    return 'horizontal';
  } else {
    return 'vertical';
  }
}

//Generate positions for a new ship
function generateShipPlacement(shipLength) {
  const newShip = {
    x: xGenerator(),
    y: yGenerator(),
    length: shipLength,
    orientation: orientationGenerator(),
  };
  //Prevent impossible ships (going off grid)
  while (
    (newShip.x !== null &&
      newShip.x + shipLength > 10 &&
      newShip.orientation === 'horizontal') ||
    (newShip.y - shipLength < -1 && newShip.orientation === 'vertical') ||
    newShip === undefined
  ) {
    newShip.x = xGenerator();
    newShip.y = yGenerator();
    newShip.orientation = orientationGenerator();
  }
  return newShip;
}

function placeShipsHelper(board, array) {
  const newShip = generateShipPlacement(2);
  const newShip2 = generateShipPlacement(3);
  const newShip3 = generateShipPlacement(3);
  const newShip4 = generateShipPlacement(4);
  const newShip5 = generateShipPlacement(5);

  function placeShipArguments(ship) {
    return [
      ship.x,
      ship.y,
      ship.length,
      ship.orientation,
      ship.shipNumber,
      array,
    ];
  }

  const placeShip1 = board.placeShip(...placeShipArguments(newShip));

  const placeShip2 = board.placeShip(...placeShipArguments(newShip2));

  const placeShip3 = board.placeShip(...placeShipArguments(newShip3));

  const placeShip4 = board.placeShip(...placeShipArguments(newShip4));

  const placeShip5 = board.placeShip(...placeShipArguments(newShip5));

  const placedShips = [
    placeShip1,
    placeShip2,
    placeShip3,
    placeShip4,
    placeShip5,
  ];

  //If a ship overlaps another ship, create a new one
  placedShips.forEach((ship) => {
    while (ship !== true) {
      let replacementShip = generateShipPlacement(ship.getShipLength());
      ship = board.placeShip(
        replacementShip.x,
        replacementShip.y,
        replacementShip.length,
        replacementShip.orientation,
        ship.shipNumber,
        array
      );
    }
  });
}

export default placeShipsHelper;
