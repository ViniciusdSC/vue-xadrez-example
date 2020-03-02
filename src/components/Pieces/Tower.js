import Base from './Base.vue';
import { blockState, charDimension } from '@/constants.js';
import { verifyBlockState, getIndexChar } from '@/helpers/fieldHelpers.js';

export default {
  extends: Base,
  methods: {
    getLine({
      char = this.getBlock().char,
      number = this.getBlock().number,
      charLogic = (char) => char,
      numberLogic = (number) => number,
      line = [],
    }) {
      let move = {
        char: charLogic(char),
        number: numberLogic(number)
      };
      switch (verifyBlockState(this.getFieldBlock(move), this)) {
        case blockState.enemy:
          line.push(move);
          return line;
        case blockState.blank:
          line.push(move);
          return this.getLine({
            char: move.char,
            number: move.number,
            charLogic,
            numberLogic,
            line
          });
        case blockState.null:
        case blockState.ally:
          return line;
        default:
          return null;
      }
    },
    showMoves() {
      let moves = [];
      this.getLine({ numberLogic: (number) => (+number - 1) }).forEach(move => {
        moves.push(move);
      });
      this.getLine({ numberLogic: (number) => (+number + 1) }).forEach(move => {
        moves.push(move);
      });
      this.getLine({
        charLogic: (char) => (charDimension[getIndexChar(char) + 1])
      }).forEach(move => {
        moves.push(move);
      });
      this.getLine({
        charLogic: (char) => (charDimension[getIndexChar(char) - 1])
      }).forEach(move => {
        moves.push(move);
      });
      this.$emit('showMoves', { char: this.char, number: this.number, moves, piece: this });
    }
  },
  computed: {
    sourceImg() {
      return this.isDark
        ? require('@/assets/tower-black.png')
        : require('@/assets/tower-white.png');
    }
  }
};
