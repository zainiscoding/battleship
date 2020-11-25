const shipFactory = (x, y, shipLength, orientation) => {
  let positions = [];

  if (x !== null) {
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
  } else {
    for (let i = 0; i < shipLength; i++) {
      const emptyPosition = { blockNumber: i, x: x, y: y, hit: false };
      positions.push(emptyPosition);
    }
  }

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

  if ((x !== null && x + shipLength > 9) || y - shipLength < 0) {
    return null;
  }

  return { shipLength, positions, hit, isSunk };
};

export default shipFactory;
