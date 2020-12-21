import gameboardFactory from '../factories/gameboardFactory';

it('returns the size', () => {
  let newGrid = gameboardFactory();
  expect(newGrid.gameboardArray.length).toEqual(100);
});

it('places a ship', () => {
  let newGrid = gameboardFactory();
  newGrid.placeShip(5, 9, 3, 'horizontal', undefined, newGrid.gameboardArray);

  expect(newGrid.gameboardArray[5].empty).toEqual(false);
});

it('doesnt overlap other ships', () => {
  let newGrid = gameboardFactory();
  newGrid.placeShip(5, 9, 3, 'horizontal', undefined, newGrid.gameboardArray);
  newGrid.placeShip(3, 9, 5, 'horizontal', undefined, newGrid.gameboardArray);
  expect(newGrid.gameboardArray[3].empty).toEqual(true);
});

it('receives attacks on ship positions', () => {
  let newGrid = gameboardFactory();
  newGrid.placeShip(5, 9, 3, 'horizontal', undefined, newGrid.gameboardArray);
  newGrid.receiveAttack(5, 5, 9);
  expect(newGrid.gameboardArray[5].ship.positionsArray[0].hit).toEqual(true);
});

it('receives attacks', () => {
  let newGrid = gameboardFactory();
  newGrid.placeShip(5, 9, 3, 'horizontal', undefined, newGrid.gameboardArray);
  newGrid.receiveAttack(5, 5, 9);
  expect(newGrid.gameboardArray[5].hit).toEqual(true);
});

it('registers misses', () => {
  let newGrid = gameboardFactory();
  newGrid.receiveAttack(5);
  expect(newGrid.gameboardArray[5].miss).toEqual(true);
});
