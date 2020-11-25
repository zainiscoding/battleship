const shipFactory = (x, y, shipLength) => {
  let positions = [];

  for (let i = 0; i < shipLength; i++) {
    const newPosition = { blockNumber: i, x: x + i, y: y, hit: false };
    positions.push(newPosition);
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
    console.log('all sunk');
    return positions.every((hitBlock) => hitBlock.hit === true);
  }

  return { shipLength, positions, hit, isSunk };
};

export default shipFactory;
