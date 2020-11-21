import playerFactory from './playerFactory';

it('makes plays', () => {
  let newPlayer = playerFactory();
  newPlayer.makePlay(3);
  expect(newPlayer.playerBoard.gameBoardArray[3].empty).toBe(false);
});
