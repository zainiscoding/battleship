const shipFactory = (coords, shipLength) => {
  let positions = [];
  for (let i = coords; i < coords + shipLength; i++) {
    positions.push(i);
  }

  function hit(position) {
    positions.splice(positions.indexOf(position), 1, 'X');
  }

  function isSunk() {
    if (!positions.includes('X')) {
      return false;
    } else {
      return true;
    }
  }

  return { shipLength, positions, hit, isSunk };
};

export default shipFactory;
