import DisplayPlayerBoard from './display_components/DisplayPlayerBoard';
import gameboardFactory from '../factories/gameboardFactory';
import { useState } from 'react';

const PlayerBoardContainer = (props) => {
  const [hoveredBlocks, setHoveredBlocks] = useState([]);

  function handleHover(e) {
    if (props.placingShip) {
      const hoveredBlocks = [];

      const newArray = [...props.playerBoard.gameboardArray];
      const newShips = [...props.playerBoard.playerShipPositions];
      const newBoard = gameboardFactory(newArray, newShips);

      const targetBlockX = parseInt(e.target.getAttribute('data-x'));
      const targetBlockY = parseInt(e.target.getAttribute('data-y'));
      const blockIndex = parseInt(e.target.id);
      const orientation = props.chosenShip.orientation;
      const length = props.chosenShip.shipLength;

      const shipPlacement = newBoard.placeShip(
        targetBlockX,
        targetBlockY,
        length,
        orientation,
        blockIndex,
        newBoard.gameboardArray
      );

      if (shipPlacement) {
        if (orientation === 'horizontal') {
          for (let i = 0; i < length; i++) {
            hoveredBlocks.push(blockIndex + i);
          }
        } else {
          for (let i = 0; i < length; i++) {
            hoveredBlocks.push(blockIndex + i * 10);
          }
        }
        setHoveredBlocks(hoveredBlocks);
      }
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
