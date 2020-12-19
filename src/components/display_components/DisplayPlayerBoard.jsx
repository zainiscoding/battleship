const DisplayPlayerBoard = (props) => {
  return (
    <div
      id={
        props.preparing
          ? 'board-wrapper__player-board-wrapper--preparing'
          : 'board-wrapper__player-board-wrapper'
      }
    >
      {props.playerBoard.gameboardArray && (
        <>
          {props.playerBoard.gameboardArray.map((block, index) => {
            if (block.ship && block.sunk) {
              return (
                <div
                  key={index}
                  className='player-ship-block--sunk'
                  id={index}
                  data-x={props.setX(index)}
                  data-y={props.setY(index)}
                ></div>
              );
            } else if (block.hit) {
              return (
                <div
                  key={index}
                  className='player-ship-block--hit'
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
                  className='player-ship-block'
                  id={index}
                  data-x={props.setX(index)}
                  data-y={props.setY(index)}
                  data-shipnumber={block.ship.getShipNumber()}
                  onClick={props.removeShipFromBoard}
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
                    onClick={props.placeChosenShip}
                  ></div>
                )}
              </>
            );
          })}
        </>
      )}
    </div>
  );
};

export default DisplayPlayerBoard;
