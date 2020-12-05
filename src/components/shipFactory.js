const shipFactory = (x, y, shipLength, orientation, shipNumber) => {
  let positions = [];
  if (orientation === 'horizontal') {
    for (let i = 0; i < shipLength; i++) {
      const newPosition = { x: x + i, y: y, hit: false };
      positions.push(newPosition);
    }
  } else {
    for (let i = 0; i < shipLength; i++) {
      const newPosition = { x: x, y: y - i, hit: false };
      positions.push(newPosition);
    }
  }

  const getShipLength = () => shipLength;
  const getOrientation = () => orientation;
  const getShipNumber = () => shipNumber;
  let placed = false;

  function hit(a, b) {
    positions.forEach((shipBlock) => {
      if (shipBlock.x === a && shipBlock.y === b) {
        positions.splice(positions.indexOf(shipBlock), 1, {
          x: shipBlock.x,
          y: shipBlock.y,
          hit: true,
        });
      }
    });
  }

  function isSunk() {
    return positions.every((hitBlock) => hitBlock.hit);
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
    positions,
    hit,
    isSunk,
    placed,
    getShipNumber,
  };
};

export default shipFactory;
