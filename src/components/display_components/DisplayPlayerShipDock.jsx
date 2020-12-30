import rotateButton from '../../assets/images/rotate.png';

const DisplayPlayerShipDock = (props) => {
  return (
    <div id='player-ships-wrapper'>
      <div id='player-ships-wrapper__instructions-wrapper'>
        <h2>Place your ships</h2>
      </div>
      <div id='player-ships-wrapper__ships'>
        {props.player.map((ship, index) => {
          return (
            <>
              {ship.placed === false && (
                <div
                  className='ship-highlight'
                  data-shipnumber={index}
                  data-length={ship.shipLength}
                  data-orientation={ship.orientation}
                  onClick={props.chooseShip}
                >
                  <div
                    key={index}
                    className={
                      'player-ships-wrapper__ship--' + ship.orientation
                    }
                    data-shipnumber={index}
                    data-length={ship.shipLength}
                    data-orientation={ship.orientation}
                    onClick={props.chooseShip}
                  >
                    <button
                      onClick={props.rotateShip}
                      className='ship__rotate-ship-button'
                    >
                      <img
                        className='rotate-ship-button__img'
                        src={rotateButton}
                        alt='Rotate ship icon'
                      />
                    </button>
                    <>
                      {ship.positionsArray.map((position, index) => {
                        return (
                          <div
                            key={index}
                            className='player-ship-block--docked'
                            id={index}
                            data-x={props.setX(index)}
                            data-y={props.setY(index)}
                          ></div>
                        );
                      })}
                    </>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
      <button onClick={props.placeRandomShips}>Auto place</button>
    </div>
  );
};

export default DisplayPlayerShipDock;
