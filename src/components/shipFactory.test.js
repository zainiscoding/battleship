import shipFactory from './shipFactory';

it.only('returns the size', () => {
  let newShip = shipFactory(1, 3, 3);
  expect(newShip.shipLength).toEqual(3);
});

it.only('returns the coords', () => {
  let newShip = shipFactory(1, 3, 3);
  expect(newShip.positions[0]).toEqual({
    blockNumber: 0,
    x: 1,
    y: 3,
    hit: false,
  });
});

it.only('gets hit', () => {
  let newShip = shipFactory(5, 3, 3);
  newShip.hit(6);
  expect(newShip.positions[1].hit).toEqual(true);
});

it.only('not sunk by default', () => {
  let newShip = shipFactory(1, 3, 3);
  expect(newShip.isSunk()).toEqual(false);
});

it.only('gets sunk', () => {
  let newShip = shipFactory(1, 3);
  newShip.hit(0);
  expect(newShip.isSunk()).toEqual(true);
});
