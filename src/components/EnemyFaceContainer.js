import thinkingCat from '../assets/images/cat-default-thinking-140x135.gif';
import angryCat from '../assets/images/cat-default-angry-140x135.gif';
import DisplayEnemyFace from './display_components/DisplayEnemyFace';

const EnemyFaceContainer = (props) => {
  return (
    <DisplayEnemyFace
      playerHit={props.playerHit}
      thinkingCat={thinkingCat}
      angryCat={angryCat}
    />
  );
};

export default EnemyFaceContainer;
