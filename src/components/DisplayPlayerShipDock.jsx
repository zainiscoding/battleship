const DisplayPlayerShipDock = (props) => {
  return (
    <div id='player-ships-wrapper'>
      {props.player.playerShips.map((ship, index) => {
        return (
          <div
            key={index}
            className={'player-ships-wrapper__ship--' + ship.getOrientation()}
            data-shipnumber={index}
            data-length={ship.getShipLength()}
            data-orientation={ship.getOrientation()}
            onClick={props.chooseShip}
          >
            <button onClick={props.rotateShip}>Rotate</button>
            <>
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
            </>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayPlayerShipDock;
