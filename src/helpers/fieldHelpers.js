import { blockState } from '@/constants.js';

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

export { verifyBlockState }
