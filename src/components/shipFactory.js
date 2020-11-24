const shipFactory = (x, y, shipLength) => {
  let positions = [];

  for (let i = 0; i < shipLength; i++) {
    const newPosition = { blockNumber: i, x: x + i, y: y, hit: false };
    positions.push(newPosition);
  }

  function hit(coords) {
    positions.forEach((shipBlock) => {
      if (shipBlock.x === coords) {
        positions.splice(positions.indexOf(shipBlock), 1, {
          blockNumber: shipBlock.blockNumber,
          x: shipBlock.x,
          y: shipBlock.y,
          hit: true,
        });
        console.log(positions);
      }
    });
  }

  function isSunk() {
    return positions.every((sunkBlock) => sunkBlock.hit === true);
  }

  return { shipLength, positions, hit, isSunk };
};

export default shipFactory;
