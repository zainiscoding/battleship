import gameboardFactory from '../factories/gameboardFactory';

function computerAttack(
  setPlayerTurn,
  playerBoard,
  setPlayerBoard,
  hitPlayerBlocks,
  setHitPlayerBlocks
) {
  let position = 0;

  //Create a random position to attack
  function getPosition() {
    return (position = Math.floor(Math.random() * 100));
  }

  setHitPlayerBlocks([...hitPlayerBlocks, getPosition()]);

  //Prevents repeat hits
  while (hitPlayerBlocks.includes(position) && hitPlayerBlocks.length < 100) {
    setHitPlayerBlocks([...hitPlayerBlocks, getPosition()]);
  }

  const newBoard = gameboardFactory(playerBoard.gameboardArray);

  newBoard.receiveAttack(
    position,
    parseInt(newBoard.gameboardArray[position].x),
    parseInt(newBoard.gameboardArray[position].y)
  );

  setPlayerBoard(newBoard);
  setPlayerTurn(true);
}

export default computerAttack;
