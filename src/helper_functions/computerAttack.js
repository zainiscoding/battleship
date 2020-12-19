function computerAttack(
  setPlayerTurn,
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

  setPlayerBoard((prevState) => {
    prevState.receiveAttack(
      position,
      parseInt(prevState.gameboardArray[position].x),
      parseInt(prevState.gameboardArray[position].y)
    );
    return { ...prevState };
  });

  setPlayerTurn(true);
}

export default computerAttack;
