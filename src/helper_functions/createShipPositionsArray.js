function createShipPositionsArray(
  x,
  y,
  orientation,
  shipLength,
  positions,
  positionsArray
) {
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
}

export default createShipPositionsArray;
