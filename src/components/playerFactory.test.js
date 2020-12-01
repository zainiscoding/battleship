import playerFactory from './playerFactory';

it('receives attacks', () => {
  let newPlayer = playerFactory();
  newPlayer.makePlay(newPlayer.playerBoard, 3, 9, 3);
  expect(newPlayer.playerBoard.gameBoardArray[3].empty).toBe(false);
});
