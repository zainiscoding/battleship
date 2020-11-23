const shipFactory = (x, y, shipLength) => {
  let positions = [];

  for (let i = 0; i < shipLength; i++) {
    console.log(positions);
    positions.push({ block: i, x: x + i, y: y });
  }

  function hit(position) {
    console.log(position);
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
