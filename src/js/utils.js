export function calcTileType(index, boardSize) {
  // TODO: write logic here
  const array = ['top-left', 'top-right', 'top', 'bottom-left', 'bottom-right', 'bottom', 'right', 'left', 'center'];
  if (index > 0 && index < boardSize - 1) {
    return array[2];
  } if (index === 0) {
    return array[0];
  } if (index === boardSize - 1) {
    return array[1];
  } if (index === boardSize || index === boardSize * 2 || index === boardSize * 3 || index === boardSize * 4 || index === boardSize * 5 || index === boardSize * 6) {
    return array[7];
  } if (index === boardSize || index === boardSize * 2 - 1 || index === boardSize * 3 - 1 || index === boardSize * 4 - 1 || index === boardSize * 5 - 1 || index === boardSize * 6 - 1 || index === boardSize * 7 - 1) {
    return array[6];
  } if (index === (boardSize - 1) * 8) {
    return array[3];
  } if (index === (boardSize) * 8 - 1) {
    return array[4];
  } if (index < (boardSize) * 8 - 1 && index > (boardSize - 1) * 8) {
    return array[5];
  }
  return array[8];
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}
