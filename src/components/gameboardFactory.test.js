import gameboardFactory from './gameboardFactory';

it('correctly returns the size', () => {
  let newGrid = gameboardFactory(4);
  expect(newGrid.gameBoardArray.length).toEqual(4);
});

it('correctly places a ship', () => {
  let newGrid = gameboardFactory(10);
  newGrid.placeShip(5, 3);
  expect(newGrid.gameBoardArray[5].empty).toEqual(false);
});

//replace gameboard array indexes of empty blocks with ships
