const shipFactory = (x, y, shipLength, orientation) => {
  let positions = [];
  if (orientation === 'horizontal') {
    for (let i = 0; i < shipLength; i++) {
      const newPosition = { blockNumber: i, x: x + i, y: y, hit: false };
      positions.push(newPosition);
    }
  } else {
    for (let i = 0; i < shipLength; i++) {
      const newPosition = { blockNumber: i, x: x, y: y - i, hit: false };
      positions.push(newPosition);
    }
  }

  const getShipLength = () => shipLength;
  const getOrientation = () => orientation;

  function hit(a, b) {
    positions.forEach((shipBlock) => {
      if (shipBlock.x === a && shipBlock.y === b) {
        positions.splice(positions.indexOf(shipBlock), 1, {
          blockNumber: shipBlock.blockNumber,
          x: shipBlock.x,
          y: shipBlock.y,
          hit: true,
        });
      }
    });
  }

  function isSunk() {
    return positions.every((hitBlock) => hitBlock.hit === true);
  }

  if (
    (x !== null && x + shipLength > 10 && orientation === 'horizontal') ||
    (y - shipLength < -1 && orientation === 'vertical')
  ) {
    return null;
  }

  function rotateSelf() {
    if (orientation === 'horizontal') {
      orientation = 'vertical';
    } else if (orientation === 'vertical') {
      orientation = 'horizontal';
    }
    return orientation;
  }

  return { getShipLength, orientation, positions, hit, isSunk, rotateSelf };
};

export default shipFactory;
