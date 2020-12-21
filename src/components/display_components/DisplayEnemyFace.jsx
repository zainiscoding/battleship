import thinkingCatBig from '../../assets/images/cat-default-thinking-140x135.gif';
import angryCatBig from '../../assets/images/cat-default-angry-140x135.gif';
import happyCatBig from '../../assets/images/cat-default-laughing-140x135.gif';
import defeatedCatBig from '../../assets/images/cat-default-defeat-140x135.gif';

const DisplayEnemyFace = (props) => {
  return (
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
  );
};

export default DisplayEnemyFace;
