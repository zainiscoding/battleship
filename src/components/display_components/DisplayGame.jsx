import DisplayPlayerBoard from './DisplayPlayerBoard';
import DisplayComputerBoard from './DisplayComputerBoard';
import DisplayPlayerShipDock from './DisplayPlayerShipDock';
import DisplayPlacementError from './DisplayPlacementError';
import EnemyFaceContainer from '../EnemyFaceContainer';

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

  //For preventing the start button from appearing before placing all ships
  const playerShips = props.playerBoard.gameboardArray.filter((arrayItem) => {
    return arrayItem.ship;
  });

  return (
    <div id='game-wrapper'>
      <div id='header-wrapper'>
        <h1>Battleship</h1>
      </div>
      <div id='board-wrapper'>
        <DisplayPlayerBoard
          player={props.player}
          playerBoard={props.playerBoard}
          setX={setX}
          setY={setY}
          placeChosenShip={props.placeChosenShip}
          removeShipFromBoard={props.removeShipFromBoard}
          preparing={props.preparing}
        />
        {props.preparing && (
          <>
            {props.placementError && <DisplayPlacementError />}
            <DisplayPlayerShipDock
              player={props.player}
              playerBoard={props.playerBoard}
              setX={setX}
              setY={setY}
              chooseShip={props.chooseShip}
              rotateShip={props.rotateShip}
              placeRandomShips={props.placeRandomShips}
            />
            {playerShips.length === 17 && (
              <button id='start-game-button' onClick={props.startGame}>
                Start game
              </button>
            )}
          </>
        )}
        {!props.preparing && (
          <>
            <div id='info-area'>
              {!props.gameOver && (
                <>
                  {props.playerTurn ? (
                    <h2 id='turn-display'>Player turn</h2>
                  ) : (
                    <h2 id='turn-display'>Computer turn</h2>
                  )}
                </>
              )}
              {props.gameOver && (
                <>
                  {props.playerWins ? (
                    <div id='game-over-info'>
                      You win!{' '}
                      <button onClick={props.restartGame}>Restart</button>
                    </div>
                  ) : (
                    <div id='game-over-info'>
                      You lose!{' '}
                      <button onClick={props.restartGame}>Restart</button>
                    </div>
                  )}
                </>
              )}
              <EnemyFaceContainer
                computerBoard={props.computerBoard}
                playerHit={props.playerHit}
                playerMiss={props.playerMiss}
                playerWins={props.playerWins}
              />
            </div>
            <DisplayComputerBoard
              computerBoard={props.computerBoard}
              setX={setX}
              setY={setY}
              playerAttackHandler={props.playerAttackHandler}
              placeChosenShip={props.placeChosenShip}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DisplayGame;
