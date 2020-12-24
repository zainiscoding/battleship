import thinkingCatBig from '../assets/images/cat-default-thinking-140x135.gif';
import angryCatBig from '../assets/images/cat-default-angry-140x135.gif';
import happyCatBig from '../assets/images/cat-default-laughing-140x135.gif';
import defeatedCatBig from '../assets/images/cat-default-defeat-140x135.gif';
import catHeart from '../assets/images/cat-heart.png';
import { useEffect, useState } from 'react';

const EnemyFaceContainer = (props) => {
  const [computerHealth, setComputerHealth] = useState(5);

  const computerShips = props.computerBoard.gameboardArray.filter(
    (arrayItem) => {
      return arrayItem.ship;
    }
  );
  const doubleFilter = computerShips.filter((arrayItem) => {
    return !arrayItem.ship.positionsArray.every((ship) => ship.hit);
  });

  return (
    <>
      <div id='cat-face-wrapper'>
        {props.playerWins && (
          <div id='cat-face'>
            <img src={defeatedCatBig} alt='Defeated cat' />
            Ouch...
          </div>
        )}
        {props.playerMiss && (
          <div id='cat-face'>
            <img src={happyCatBig} alt='Happy cat' />
            You missed!
          </div>
        )}
        {!props.playerHit && !props.playerMiss && !props.playerWins && (
          <div id='cat-face'>
            <img src={thinkingCatBig} alt='Thinking cat' />
            Hmm...
          </div>
        )}
        {props.playerHit && !props.playerWins && (
          <div id='cat-face'>
            <img src={angryCatBig} alt='Angry cat' />
            You hit my ship!
          </div>
        )}
      </div>
      <div id='cat-lives-wrapper'>
        {Array.from(Array(computerHealth)).map((index) => {
          return (
            <div className='heart' key={index}>
              <img src={catHeart} alt='Cat life' />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default EnemyFaceContainer;
