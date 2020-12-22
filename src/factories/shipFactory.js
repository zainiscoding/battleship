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

  let placed = false;

  const getShipLength = () => shipLength;
  const getOrientation = () => orientation;
  const getShipNumber = () => shipNumber;
  function isSunk() {
    return positionsArray.every((block) => block.hit);
  }

  return {
    getShipLength,
    getOrientation,
    positionsArray,
    isSunk,
    placed,
    getShipNumber,
  };
};

export default shipFactory;
