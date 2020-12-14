import gameboardFactory from '../factories/gameboardFactory';

it('returns the size', () => {
  let newGrid = gameboardFactory();
  expect(newGrid.gameBoardArray.length).toEqual(100);
});

it('places a ship', () => {
  let newGrid = gameboardFactory(10);
  newGrid.placeShip(5, 9, 3, 'horizontal');
  expect(newGrid.gameBoardArray[5].empty).toEqual(false);
});

it('doesnt overlap other ships', () => {
  let newGrid = gameboardFactory();
  newGrid.placeShip(5, 9, 3, 'horizontal');
  newGrid.placeShip(3, 9, 5, 'horizontal');
  expect(newGrid.gameBoardArray[3].empty).toEqual(true);
});

it('receives attacks on ship positions', () => {
  let newGrid = gameboardFactory(10);
  newGrid.placeShip(5, 9, 3);
  newGrid.receiveAttack(5, 5, 9);
  expect(newGrid.gameBoardArray[5].ship.positions[0].hit).toEqual(true);
});

it('receives attacks', () => {
  let newGrid = gameboardFactory(10);
  newGrid.placeShip(5, 9, 3);
  newGrid.receiveAttack(5, 5, 9);
  expect(newGrid.gameBoardArray[5].hit).toEqual(true);
});

it('registers misses', () => {
  let newGrid = gameboardFactory(10);
  newGrid.receiveAttack(5);
  expect(newGrid.gameBoardArray[5].miss).toEqual(true);
});
