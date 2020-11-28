import DisplayPlayerBoard from './DisplayPlayerBoard';
import DisplayPlayerShips from './DisplayPlayerShipDock';
import DisplayComputerBoard from './DisplayComputerBoard';
import PlayerShipDockContainer from './PlayerShipDockContainer';

const DisplayGame = (props) => {
  return (
    <div id='game-wrapper'>
      <DisplayPlayerBoard
        player={props.player}
        setX={props.setX}
        setY={props.setY}
        placeChosenShip={props.placeChosenShip}
      />
      <DisplayComputerBoard
        computerBoardArray={props.computer.playerBoard.gameBoardArray}
        setX={props.setX}
        setY={props.setY}
        playerAttackHandler={props.playerAttackHandler}
        placeChosenShip={props.placeChosenShip}
      />
      <PlayerShipDockContainer
        player={props.player}
        setX={props.setX}
        setY={props.setY}
        chooseShip={props.chooseShip}
        rotateShip={props.rotateShip}
      />
      <button onClick={props.placeTestShip}>Test</button>
      <button onClick={props.computerAttack}>Attacked</button>
      <div id='player-ship-wrapper'></div>
    </div>
  );
};

export default DisplayGame;
