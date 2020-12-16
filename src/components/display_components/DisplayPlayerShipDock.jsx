const DisplayPlayerShipDock = (props) => {
  return (
    <div id='player-ships-wrapper'>
      <div id='player-ships-wrapper__instructions-wrapper'>
        <h2>Place your ships</h2>
      </div>
      <div id='player-ships-wrapper__ships'>
        {props.player.playerShips.map((ship, index) => {
          return (
            <>
              {ship.placed === false && (
                <div
                  key={index}
                  className={
                    'player-ships-wrapper__ship--' + ship.getOrientation()
                  }
                  data-shipnumber={index}
                  data-length={ship.getShipLength()}
                  data-orientation={ship.getOrientation()}
                  onClick={props.chooseShip}
                >
                  <button
                    onClick={props.rotateShip}
                    className='ship__rotate-ship-button'
                  >
                    Rotate
                  </button>
                  <>
                    {ship.positions.map((position, index) => {
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
