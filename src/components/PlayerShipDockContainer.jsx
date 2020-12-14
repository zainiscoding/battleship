import DisplayPlayerShipDock from './display_components/DisplayPlayerShipDock';

const PlayerShipDockContainer = (props) => {
  return (
    <DisplayPlayerShipDock
      player={props.player}
      setX={props.setX}
      setY={props.setY}
      chooseShip={props.chooseShip}
      rotateShip={props.rotateShip}
      mouseMove={props.mouseMove}
    />
  );
};

export default PlayerShipDockContainer;
