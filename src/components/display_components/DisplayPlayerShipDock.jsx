import rotateButton from '../../assets/images/rotate.png';

const DisplayPlayerShipDock = (props) => {
  return (
    <div id='player-ships-wrapper'>
      <div id='player-ships-wrapper__instructions-wrapper'>
        <h2 id='instructions-wrapper__place-all-ships-header'>
          Place your ships
        </h2>
        <p id='instructions-wrapper__instructions'>
          Click on the green area of a ship to begin placing. Click on the board
          to place the selected ship.
        </p>
        <button
          onClick={props.rotateShips}
          className='ship__rotate-ship-button'
        >
          <img
            className='rotate-ship-button__img'
            src={rotateButton}
            alt='Rotate ship icon'
          />
        </button>
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
      <div id='player_ships_wrapper--auto-place-wrapper'>
        <p>
          Alternatively, press "auto place" to automatically place all ships and
          begin the game.
        </p>
        <button onClick={props.placeRandomShips}>Auto place</button>
      </div>
    </div>
  );
};

export default DisplayPlayerShipDock;
