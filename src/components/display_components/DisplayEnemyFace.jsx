const DisplayEnemyFace = (props) => {
  return (
    <div id='cat-face'>
      {!props.playerHit && <img src={props.thinkingCat} alt='Thinking cat' />}
      {props.playerHit && <img src={props.angryCat} alt='Angry cat!' />}
    </div>
  );
};

export default DisplayEnemyFace;
