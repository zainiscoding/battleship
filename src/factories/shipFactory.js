const shipFactory = (x, y, shipLength, orientation, shipNumber, positions) => {
  let positionsArray = [];

  if (positions) {
    positionsArray = positions;
  } else {
    if (orientation === 'horizontal') {
      for (let i = 0; i < shipLength; i++) {
        const newPosition = { x: x + i, y: y, hit: false };
        positionsArray.push(newPosition);
      }
    } else {
      for (let i = 0; i < shipLength; i++) {
        const newPosition = { x: x, y: y - i, hit: false };
        positionsArray.push(newPosition);
      }
    }
  }

  const getShipLength = () => shipLength;
  const getOrientation = () => orientation;
  const getShipNumber = () => shipNumber;
  let placed = false;

  function hit(a, b) {
    positionsArray.forEach((shipBlock) => {
      if (shipBlock.x === a && shipBlock.y === b) {
        positionsArray.splice(positionsArray.indexOf(shipBlock), 1, {
          x: shipBlock.x,
          y: shipBlock.y,
          hit: true,
        });
      }
    });
  }

  function isSunk() {
    return positionsArray.every((block) => block.hit);
  }

  if (
    (x !== null && x + shipLength > 10 && orientation === 'horizontal') ||
    (y - shipLength < -1 && orientation === 'vertical')
  ) {
    return null;
  }

  return {
    getShipLength,
    getOrientation,
    positionsArray,
    hit,
    isSunk,
    placed,
    getShipNumber,
  };
};

export default shipFactory;
