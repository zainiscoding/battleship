import DisplayPlayerBoard from './DisplayPlayerBoard';
import DisplayPlayerShips from './DisplayPlayerShips';
import DisplayComputerBoard from './DisplayComputerBoard';

const DisplayGame = (props) => {
  return (
    <div id='game-wrapper'>
      <DisplayPlayerBoard
        player={props.player}
        setX={props.setX}
        setY={props.setY}
      />
      <DisplayComputerBoard
        computerBoardArray={props.computer.playerBoard.gameBoardArray}
        setX={props.setX}
        setY={props.setY}
        playerAttackHandler={props.playerAttackHandler}
      />
      {props.startingPlayerShips.shipsToAdd !== undefined && (
        <DisplayPlayerShips
          player={props.player}
          startingPlayerShips={props.startingPlayerShips}
          setX={props.setX}
          setY={props.setY}
        />
      )}
      <button onClick={props.placeTestShip}>Test</button>
      <button onClick={props.computerAttack}>Attacked</button>
      <div id='player-ship-wrapper'></div>
    </div>
  );
};

export default DisplayGame;
