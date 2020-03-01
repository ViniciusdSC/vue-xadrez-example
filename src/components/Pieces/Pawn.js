import Base from './Base.vue';
import { charDimension } from '@/constants';

function getIndexChar(char) {
  for (let i = 0; i < charDimension.length; i++) {
    if (char == charDimension[i]) {
      return i;
    }
  }
  return null;
}

function beforeMount() {
  this.sourceImg = this.isDark
    ? require('@/assets/pawn-black.png')
    : require('@/assets/pawn-white.png');
}

function showMoves() {
  let moves = [];
  let nextLine = this.isDark
    ? charDimension[getIndexChar(this.char) + 1]
    : charDimension[getIndexChar(this.char) - 1];
  if (this.field[nextLine] && !this.field[nextLine][+this.number - 1].component) {
    moves.push({
      char: nextLine,
      number: +this.number
    });
  }
  // FIXME: Isso é uma verificação se existe uma peça no lugar e se é do adversário, faz isso de uma forma que de pra reaproveitar
  if (
    this.field[nextLine][this.number - 1].component &&
    this.field[nextLine][this.number - 1].isDark !== this.isDark
  ) {
    moves.push({
      char: nextLine,
      number: +this.number - 1
    })
  }
  if (
    this.field[nextLine][+this.number + 1].component &&
    this.field[nextLine][+this.number + 1].isDark !== this.isDark
  ) {
    moves.push({
      char: nextLine,
      number: +this.number + 1
    })
  }
  this.$emit('showMoves', { char: this.char, number: this.number }, moves);
}

Base.beforeMount = beforeMount;

Base.methods.showMoves = showMoves;

export default Base;
