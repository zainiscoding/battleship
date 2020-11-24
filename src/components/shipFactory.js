const shipFactory = (x, y, shipLength) => {
  let positions = [];

  for (let i = 0; i < shipLength; i++) {
    positions.push({ blockNumber: i, x: x + i, y: y, hit: false });
  }

  function hit(position) {
    positions.forEach((shipBlock) => {
      if (shipBlock.x === position) {
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
    return positions.every((sunkBlock) => sunkBlock.hit === true);
  }

  return { shipLength, positions, hit, isSunk };
};

export default shipFactory;
