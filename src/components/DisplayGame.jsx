import DisplayPlayerBoard from './DisplayPlayerBoard';
import DisplayComputerBoard from './DisplayComputerBoard';
import PlayerShipDockContainer from './PlayerShipDockContainer';

const DisplayGame = (props) => {
  return (
    <div id='game-wrapper'>
      <div id='board-wrapper'>
        <DisplayPlayerBoard
          player={props.player}
          setX={props.setX}
          setY={props.setY}
          placeChosenShip={props.placeChosenShip}
          removeShipFromBoard={props.removeShipFromBoard}
        />
        <DisplayComputerBoard
          computerBoardArray={props.computer.playerBoard.gameBoardArray}
          setX={props.setX}
          setY={props.setY}
          playerAttackHandler={props.playerAttackHandler}
          placeChosenShip={props.placeChosenShip}
        />
      </div>
      {props.preparing && (
        <>
          <PlayerShipDockContainer
            player={props.player}
            setX={props.setX}
            setY={props.setY}
            chooseShip={props.chooseShip}
            rotateShip={props.rotateShip}
          />
          <button onClick={props.startGame}>Start game</button>
        </>
      )}
      <button onClick={props.placeTestShip}>Test</button>
      <button onClick={props.computerAttack}>Attacked</button>
    </div>
  );
};

export default DisplayGame;
