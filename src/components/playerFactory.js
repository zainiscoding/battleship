import gameboardFactory from './gameboardFactory';
import shipFactory from './shipFactory';

const playerFactory = (name) => {
  const getName = () => name;
  const playerBoard = gameboardFactory();

  let newShip = shipFactory(undefined, undefined, 3, 'horizontal');
  let newShip2 = shipFactory(undefined, undefined, 5, 'horizontal');
  let newShip3 = shipFactory(undefined, undefined, 6, 'horizontal');
  const playerShips = [];
  playerShips.push(newShip, newShip2, newShip3);

  function rotateHorizontalShip(shipIndex) {
    console.log('rotating');
    const newVerticalShip = shipFactory(
      playerShips[shipIndex].x,
      playerShips[shipIndex].y,
      playerShips[shipIndex].getShipLength(),
      'vertical'
    );
    return playerShips.splice(shipIndex, 1, newVerticalShip);
  }

  function rotateVerticalShip(shipIndex) {
    const newHorizontalShip = shipFactory(
      playerShips[shipIndex].x,
      playerShips[shipIndex].y,
      playerShips[shipIndex].getShipLength(),
      'horizontal'
    );
    return playerShips.splice(shipIndex, 1, newHorizontalShip);
  }

  // function rotateShip(shipIndex) {
  //   const orientation =
  //     playerShips[shipIndex].getOrientation() === 'horizontal'
  //       ? 'vertical'
  //       : 'horizontal';
  //   const newShip = shipFactory(
  //     playerShips[shipIndex].x,
  //     playerShips[shipIndex].y,
  //     playerShips[shipIndex].getShipLength(),
  //     orientation
  //   );
  //   return playerShips.splice(shipIndex, 1, newShip);
  // }

  function removeShip(shipIndex) {
    return playerShips.splice(shipIndex, 1);
  }

  function makePlay(toAttack, x, y, length) {
    let randomPosition = Math.floor(Math.random() * 100);
    if (x !== undefined) {
      toAttack.placeShip(x, y, length);
    } else {
      toAttack.receiveAttack(randomPosition);
    }
  }

  return {
    getName,
    playerBoard,
    makePlay,
    removeShip,
    playerShips,
    rotateHorizontalShip,
    rotateVerticalShip,
  };
};

export default playerFactory;
