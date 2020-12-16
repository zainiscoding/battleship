import thinkingCatBig from '../assets/images/cat-default-thinking-140x135.gif';
import angryCatBig from '../assets/images/cat-default-angry-140x135.gif';
import happyCatBig from '../assets/images/cat-default-laughing-140x135.gif';
import defeatedCatBig from '../assets/images/cat-default-defeat-140x135.gif';
import thinkingCatSmall from '../assets/images/cat-default-thinking-60x58.gif';
import angryCatSmall from '../assets/images/cat-default-angry-60x58.gif';
import happyCatSmall from '../assets/images/cat-default-laughing-60x58.gif';
import defeatedCatSmall from '../assets/images/cat-default-defeat-60x58.gif';
import DisplayEnemyFace from './display_components/DisplayEnemyFace';

const EnemyFaceContainer = (props) => {
  return (
    <DisplayEnemyFace
      playerHit={props.playerHit}
      thinkingCat={thinkingCatBig}
      angryCat={angryCatBig}
    />
  );
};

export default EnemyFaceContainer;
