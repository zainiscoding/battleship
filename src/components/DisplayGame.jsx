import DisplayPlayerBoard from './DisplayPlayerBoard';
import DisplayComputerBoard from './DisplayComputerBoard';
import PlayerShipDockContainer from './PlayerShipDockContainer';
import DisplayPlacementError from './DisplayPlacementError';
import DisplayPlaceAllShipsError from './DisplayPlaceAllShipsError';

const DisplayGame = (props) => {
  //Used to set data values of the blocks
  function setX(index) {
    let x = index;
    if (index > 9) {
      return (x = index % 10);
    } else {
      return x;
    }
  }

  //Same as above
  //Thanks to 'cyborg/human#5133' on TOP Discord for the much cleaner version of this function!
  function setY(index) {
    let y = 9;
    if (index > 89) {
      return (y = 0);
    } else {
      const val = Math.floor(index / 10);
      return (y = 9 - val);
    }
  }

  return (
    <div id='game-wrapper'>
      <div id='header-wrapper'>
        <h1>Battleship</h1>
      </div>
      <div id='board-wrapper'>
        <DisplayPlayerBoard
          player={props.player}
          setX={setX}
          setY={setY}
          placeChosenShip={props.placeChosenShip}
          removeShipFromBoard={props.removeShipFromBoard}
          preparing={props.preparing}
        />
        {props.preparing && (
          <>
            {props.placementError && <DisplayPlacementError />}
            {props.placeAllShipsError && <DisplayPlaceAllShipsError />}
            <PlayerShipDockContainer
              player={props.player}
              setX={setX}
              setY={setY}
              chooseShip={props.chooseShip}
              rotateShip={props.rotateShip}
            />
            <button id='start-game-button' onClick={props.startGame}>
              Start game
            </button>
          </>
        )}
        {!props.preparing && (
          <>
            {props.playerTurn ? (
              <h2 className='turn-display'>Player turn</h2>
            ) : (
              <h2 className='turn-display'>Computer turn</h2>
            )}
            <DisplayComputerBoard
              computerBoardArray={props.computer.gameBoard.gameBoardArray}
              setX={setX}
              setY={setY}
              playerAttackHandler={props.playerAttackHandler}
              placeChosenShip={props.placeChosenShip}
            />
          </>
        )}
      </div>
      {props.gameOver && (
        <>
          {props.playerWins && <div>You win!</div>}
          {!props.playerWins && <div>You lose!</div>}
          <button onClick={props.restartGame}>Restart</button>
        </>
      )}
    </div>
  );
};

export default DisplayGame;
