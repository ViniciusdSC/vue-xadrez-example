import Base from './Base.vue';
import { charDimension, blockState } from '@/constants.js';
import { verifyBlockState } from '@/helpers/fieldHelpers.js';

function getIndexChar(char) {
  for (let i = 0; i < charDimension.length; i++) {
    if (char == charDimension[i]) {
      return i;
    }
  }
  return null;
}

function sourceImg() {
  return this.isDark
    ? require('@/assets/pawn-black.png')
    : require('@/assets/pawn-white.png');
}

function showMoves() {
  let moves = [];
  let nextLine = this.isDark
    ? charDimension[getIndexChar(this.char) + 1]
    : charDimension[getIndexChar(this.char) - 1];
  if (!this.field[nextLine]) {
    return
  }
  if (verifyBlockState(this.field[nextLine][+this.number], this) === blockState.blank) {
    moves.push({
      char: nextLine,
      number: +this.number
    });
  }
  if (
    this.isDark &&
    this.char === 'B' &&
    verifyBlockState(this.field[charDimension[getIndexChar(this.char) + 2]][+this.number], this) === blockState.blank
  ) {
    moves.push({
      char: charDimension[getIndexChar(this.char) + 2],
      number: this.number
    })
  } else if (
    !this.isDark &&
    this.char === 'G' &&
    verifyBlockState(this.field[charDimension[getIndexChar(this.char) - 2]][+this.number], this) === blockState.blank
  ) {
    moves.push({
      char: charDimension[getIndexChar(this.char) - 2],
      number: this.number
    })
  }
  if (verifyBlockState(this.field[nextLine][+this.number - 1], this) === blockState.enemy) {
    moves.push({
      char: nextLine,
      number: +this.number - 1
    })
  }
  if (verifyBlockState(this.field[nextLine][+this.number + 1], this) === blockState.enemy) {
    moves.push({
      char: nextLine,
      number: +this.number + 1
    })
  }
  this.$emit('showMoves', {
    char: this.char,
    number: this.number,
    moves,
    piece: this
  });
}

Base.computed.sourceImg = sourceImg;

Base.methods.showMoves = showMoves;

export default Base;
