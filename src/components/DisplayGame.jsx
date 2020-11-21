const DisplayGame = (props) => {
  return (
    <div id='game-wrapper'>
      <div id='game-wrapper__player-board-wrapper'>
        {props.player.playerBoard.gameBoardArray.map((block, index) => {
          if (block.ship) {
            return <div key={index} className='shipBlock'></div>;
          } else {
            return <div key={index} className='emptyBlock'></div>;
          }
        })}
        <button onClick={props.playerHandler}></button>
      </div>
    </div>
  );
};

export default DisplayGame;
