const DisplayComputerBoard = (props) => {
  return (
    <div id='board-wrapper__computer-board-wrapper'>
      {props.computerBoard.gameBoardArray.map((block, index) => {
        if (block.ship && block.sunk) {
          return (
            <div
              key={index}
              className='enemy-ship-block--sunk'
              id={index}
              data-x={props.setX(index)}
              data-y={props.setY(index)}
            ></div>
          );
        } else if (block.hit) {
          return (
            <div
              key={index}
              className='enemy-ship-block--hit'
              id={index}
              data-x={props.setX(index)}
              data-y={props.setY(index)}
            >
              !
            </div>
          );
        } else if (block.ship && !block.hit) {
          return (
            <div
              key={index}
              className='enemy-ship-block'
              id={index}
              data-x={props.setX(index)}
              data-y={props.setY(index)}
              onClick={props.playerAttackHandler}
            ></div>
          );
        } else if (block.miss) {
          return <div key={index} className='miss-block'></div>;
        }
        return (
          <>
            {!block.ship && (
              <div
                key={index}
                className='empty-block'
                id={index}
                data-x={props.setX(index)}
                data-y={props.setY(index)}
                onClick={props.playerAttackHandler}
              ></div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default DisplayComputerBoard;
