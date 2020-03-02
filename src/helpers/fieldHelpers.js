import { blockState, charDimension } from '@/constants.js';

const verifyBlockState = function (block, piece) {
  if (!block) {
    return blockState.null
  }
  if (!block.component) {
    return blockState.blank;
  } else if (block.isDark === piece.isDark) {
    return blockState.ally;
  } else {
    return blockState.enemy;
  }
};

function getIndexChar(char) {
  for (let i = 0; i < charDimension.length; i++) {
    if (char == charDimension[i]) {
      return i;
    }
  }
  return null;
}

export { verifyBlockState, getIndexChar }
