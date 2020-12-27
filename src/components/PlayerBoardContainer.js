import DisplayPlayerBoard from './display_components/DisplayPlayerBoard';
import { useState } from 'react';

const PlayerBoardContainer = (props) => {
  const [hoveredBlocks, setHoveredBlocks] = useState([]);

  function handleHover(e) {
    console.log(props.placingShip);
    if (props.placingShip) {
      const blockIndex = parseInt(e.target.id);
      const orientation = props.chosenShip.orientation;
      const length = props.chosenShip.shipLength;
      const hoveredBlocks = [];

      if (orientation === 'horizontal') {
        if (!((blockIndex % 10) + length > 10)) {
          for (let i = 0; i < length; i++) {
            hoveredBlocks.push(blockIndex + i);
          }
        }
      } else {
        if (!(blockIndex + length * 10 >= 110)) {
          for (let i = 0; i < length; i++) {
            hoveredBlocks.push(blockIndex + i * 10);
          }
        }
      }
      setHoveredBlocks(hoveredBlocks);
    }
  }

  function removeHoveredBlocks() {
    setHoveredBlocks([]);
  }

  return (
    <DisplayPlayerBoard
      hoveredBlocks={hoveredBlocks}
      handleHover={handleHover}
      removeHoveredBlocks={removeHoveredBlocks}
      player={props.player}
      playerBoard={props.playerBoard}
      setX={props.setX}
      setY={props.setY}
      placeChosenShip={props.placeChosenShip}
      placingShip={props.placingShip}
      chosenShip={props.chosenShip}
      removeShipFromBoard={props.removeShipFromBoard}
      preparing={props.preparing}
    />
  );
};

export default PlayerBoardContainer;
