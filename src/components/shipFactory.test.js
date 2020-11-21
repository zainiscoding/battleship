import shipFactory from './shipFactory';

it('returns the size', () => {
  let newShip = shipFactory(3);
  expect(newShip.shipLength).toEqual(3);
});

it('returns the coords', () => {
  let newShip = shipFactory(3);
  expect(newShip.positions).toEqual([0, 1, 2]);
});

it('gets hit', () => {
  let newShip = shipFactory(3);
  newShip.hit(0);
  expect(newShip.positions).toEqual(['X', 1, 2]);
});

it('not sunk by default', () => {
  let newShip = shipFactory(3);
  expect(newShip.isSunk()).toEqual(false);
});

it('gets sunk', () => {
  let newShip = shipFactory(3);
  newShip.hit(0);
  expect(newShip.isSunk()).toEqual(true);
});
