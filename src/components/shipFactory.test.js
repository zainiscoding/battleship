import shipFactory from './shipFactory';

it('returns the size', () => {
  let newShip = shipFactory(1, 3, 3);
  expect(newShip.shipLength).toEqual(3);
});

it('returns the coords', () => {
  let newShip = shipFactory(1, 3);
  expect(newShip.positions).toEqual([1, 2, 3]);
});

it('gets hit', () => {
  let newShip = shipFactory(5, 3);
  newShip.hit(5);
  expect(newShip.positions).toEqual(['X', 6, 7]);
});

it('not sunk by default', () => {
  let newShip = shipFactory(1, 3);
  expect(newShip.isSunk()).toEqual(false);
});

it('gets sunk', () => {
  let newShip = shipFactory(1, 3);
  newShip.hit(0);
  expect(newShip.isSunk()).toEqual(true);
});
