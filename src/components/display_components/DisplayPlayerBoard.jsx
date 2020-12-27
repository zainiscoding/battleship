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
                  data-shipnumber={block.ship.shipNumber}
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
                    id={index}
                    className={
                      props.hoveredBlocks.includes(index)
                        ? 'empty-block--hovered'
                        : 'empty-block--hovered--not-allowed'
                    }
                    data-x={props.setX(index)}
                    data-y={props.setY(index)}
                    onClick={props.placeChosenShip}
                    onMouseEnter={props.handleHover}
                    onMouseLeave={props.removeHoveredBlocks}
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
