import { DragDropContext } from 'react-beautiful-dnd';

const DisplayPlayerShips = (props) => {
  return (
    <div id='player-ships-wrapper'>
      {props.startingPlayerShips.shipsToAdd.map((ship, index) => {
        return (
          <div
            key={index}
            className='player-ship-block'
            id={index}
            data-x={props.setX(index)}
            data-y={props.setY(index)}
          >
            Ship {index}
            {ship.shipLength}
            <div>
              {ship.positions.map((position, index) => {
                return (
                  <div
                    key={index}
                    className='player-ship-block'
                    id={index}
                    data-x={props.setX(index)}
                    data-y={props.setY(index)}
                  >
                    position {index}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayPlayerShips;
