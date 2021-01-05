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
                  className='player-ship-block--sunk'
                  id={index}
                  key={index}
                  data-x={props.setX(index)}
                  data-y={props.setY(index)}
                ></div>
              );
            } else if (block.hit) {
              return (
                <div
                  className='player-ship-block--hit'
                  id={index}
                  key={index}
                  data-x={props.setX(index)}
                  data-y={props.setY(index)}
                ></div>
              );
            } else if (block.ship && !block.hit) {
              return (
                <div
                  className={
                    props.preparing
                      ? 'player-ship-block--removable'
                      : 'player-ship-block'
                  }
                  id={index}
                  key={index}
                  data-x={props.setX(index)}
                  data-y={props.setY(index)}
                  data-shipnumber={block.ship.shipNumber}
                  onClick={props.removeShipFromBoard}
                ></div>
              );
            } else if (block.miss) {
              return <div key={index} className='miss-block'></div>;
            } else {
              return (
                <div
                  id={index}
                  key={index}
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
              );
            }
          })}
        </>
      )}
    </div>
  );
};

export default DisplayPlayerBoard;
