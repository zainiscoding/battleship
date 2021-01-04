import rotateButton from '../../assets/images/rotate.png';

const DisplayPlayerShipDock = (props) => {
  return (
    <div id='player-ships-wrapper'>
      <div id='player-ships-wrapper__instructions-wrapper'>
        <p id='instructions-wrapper__instructions'>
          Click on the green area of a ship to begin placing. Click on the board
          to place the selected ship. Once placed, click again to remove the
          ship.
        </p>
      </div>
      <div id='player-ships-wrapper__ships'>
        <div id='player-ships-wrapper__ships__horizontal'>
          {props.player.map((ship, index) => {
            return (
              <>
                {ship.placed === false && ship.orientation === 'horizontal' && (
                  <div
                    className={
                      ship.highlighted === false
                        ? 'ship-highlight'
                        : 'ship-highlight--selected'
                    }
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
                      <div
                        onClick={props.rotateShip}
                        className='ship__rotate-ship-button'
                      >
                        <img
                          className='rotate-ship-button__img'
                          src={rotateButton}
                          alt='Rotate ship icon'
                        />
                      </div>
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
        <div id='player-ships-wrapper__ships__vertical'>
          {props.player.map((ship, index) => {
            return (
              <>
                {ship.placed === false && ship.orientation === 'vertical' && (
                  <div
                    className={
                      ship.highlighted === false
                        ? 'ship-highlight'
                        : 'ship-highlight--selected'
                    }
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
                      <div
                        onClick={props.rotateShip}
                        className='ship__rotate-ship-button'
                      >
                        <img
                          className='rotate-ship-button__img'
                          src={rotateButton}
                          alt='Rotate ship icon'
                        />
                      </div>
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
      </div>
      <div id='player-ships-wrapper__auto-place-wrapper'>
        <p>
          Alternatively, press "Auto place" to automatically place all ships and
          begin the game.
        </p>
        <div
          id='player-ships-wrapper__auto-place-button'
          onClick={props.placeRandomShips}
          onMouseEnter={(e) =>
            (e.target.id = 'player-ships-wrapper__auto-place-button--color')
          }
        >
          Auto place
        </div>
      </div>
    </div>
  );
};

export default DisplayPlayerShipDock;
