import DisplayPlayerBoard from './DisplayPlayerBoard';
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
      <button onClick={props.placeTestShip}>Test</button>
      <button onClick={props.computerAttack}>Attacked</button>
    </div>
  );
};

export default DisplayGame;
