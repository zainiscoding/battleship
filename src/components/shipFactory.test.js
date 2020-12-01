import shipFactory from './shipFactory';

it('returns the size', () => {
  let newShip = shipFactory(1, 3, 3, 'horizontal');
  expect(newShip.getShipLength()).toEqual(3);
});

it('returns the coords', () => {
  let newShip = shipFactory(1, 3, 3, 'horizontal');
  expect(newShip.positions[2]).toEqual({
    x: 3,
    y: 3,
    hit: false,
  });
});

it('rotates correctly', () => {
  let newShip = shipFactory(1, 3, 3, 'vertical');
  expect(newShip.positions[2]).toEqual({
    x: 1,
    y: 1,
    hit: false,
  });
});

it('gets hit', () => {
  let newShip = shipFactory(5, 3, 3, 'horizontal');
  newShip.hit(6, 3);
  expect(newShip.positions[1].hit).toEqual(true);
});

it('gets hit vertically', () => {
  let newShip = shipFactory(5, 3, 3, 'vertical');
  newShip.hit(5, 2);
  expect(newShip.positions[1].hit).toEqual(true);
});

it('not sunk by default', () => {
  let newShip = shipFactory(1, 3, 3);
  expect(newShip.isSunk()).toEqual(false);
});

it('gets sunk', () => {
  let newShip = shipFactory(1, 3, 3, 'horizontal');
  newShip.hit(1, 3);
  newShip.hit(2, 3);
  newShip.hit(3, 3);
  expect(newShip.isSunk()).toEqual(true);
});

it('gets sunk vertically', () => {
  let newShip = shipFactory(1, 3, 3, 'vertical');
  newShip.hit(1, 3);
  newShip.hit(1, 2);
  newShip.hit(1, 1);
  expect(newShip.isSunk()).toEqual(true);
});

it('doesnt break the grid', () => {
  let newShip = shipFactory(8, 3, 3, 'horizontal');
  expect(newShip).toEqual(null);
});

it('doesnt overlap other ships', () => {
  let newShip = shipFactory(1, 3, 3, 'horizontal');
  let newShip2 = shipFactory(0, 3, 5, 'horizontal');
  expect(newShip2).toEqual(null);
});
