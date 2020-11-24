import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const DisplayGame = (props) => {
  return (
    <div id='game-wrapper'>
      <div id='game-wrapper__player-board-wrapper'>
        {props.player.playerBoard.gameBoardArray.map((block, index) => {
          if (block.ship) {
            return <div key={index} className='ship-block'></div>;
          } else if (block.miss) {
            return (
              <div key={index} className='miss-block'>
                X
              </div>
            );
          } else {
            return <div key={index} className='empty-block'></div>;
          }
        })}
      </div>
      <div id='game-wrapper__computer-board-wrapper'>
        {props.computer.playerBoard.gameBoardArray.map((block, index) => {
          if (block.ship) {
            return (
              <div id='ship'>
                {[...block.ship.positions].map((position) => {
                  return position.hit === true ? (
                    <div
                      key={index}
                      className='enemy-ship-block'
                      id={index}
                      onClick={props.playerAttackHandler}
                      data-x={props.setX(index)}
                      data-y={props.setY(index)}
                    >
                      HIT
                    </div>
                  ) : (
                    <div
                      key={index}
                      id={index}
                      className='enemy-ship-block'
                      onClick={props.playerAttackHandler}
                      data-x={props.setX(index)}
                      data-y={props.setY(index)}
                    >
                      Ship
                    </div>
                  );
                })}
              </div>
            );
          } else if (block.miss) {
            return (
              <div key={index} className='miss-block'>
                Miss
              </div>
            );
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
      <button onClick={props.placeTestShip}>Test</button>
    </div>
  );
};

export default DisplayGame;
