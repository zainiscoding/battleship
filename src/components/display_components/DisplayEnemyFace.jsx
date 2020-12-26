import thinkingCatBig from '../../assets/images/cat-default-thinking-140x135.gif';
import angryCatBig from '../../assets/images/cat-default-angry-140x135.gif';
import happyCatBig from '../../assets/images/cat-default-laughing-140x135.gif';
import defeatedCatBig from '../../assets/images/cat-default-defeat-140x135.gif';
import catHeart from '../../assets/images/cat-heart.png';

const DisplayEnemyFace = (props) => {
  return (
    <>
      <div id='cat-face-wrapper'>
        {props.playerWins && (
          <div id='cat-face'>
            <img
              id='cat-face-wrapper__cat-face'
              src={defeatedCatBig}
              alt='Defeated cat'
            />
            Ouch...
          </div>
        )}
        {props.playerMiss && (
          <div id='cat-face'>
            <img
              id='cat-face-wrapper__cat-face'
              src={happyCatBig}
              alt='Happy cat'
            />
            You missed!
          </div>
        )}
        {!props.playerHit && !props.playerMiss && !props.playerWins && (
          <div id='cat-face'>
            <img
              id='cat-face-wrapper__cat-face'
              src={thinkingCatBig}
              alt='Thinking cat'
            />
            Hmm...
          </div>
        )}
        {props.playerHit && !props.playerWins && (
          <div id='cat-face'>
            <img
              id='cat-face-wrapper__cat-face'
              src={angryCatBig}
              alt='Angry cat'
            />
            You hit my ship!
          </div>
        )}
      </div>
      <div id='cat-lives-wrapper'>
        {Array.from(Array(props.computerHealth)).map((index) => {
          return (
            <img
              className='cat-lives-wrapper__heart'
              src={catHeart}
              alt='Cat life'
            />
          );
        })}
      </div>
    </>
  );
};

export default DisplayEnemyFace;
