import Base from './Base.vue';
import { charDimension } from '@/constants.js';
import { getIndexChar } from '@/helpers/fieldHelpers.js';

export default {
  extends: Base,
  methods: {
    showMoves() {
      let moves = [];
      this.getLine({
        numberLogic: (number) => (+number - 1),
        charLogic: (char) => (charDimension[getIndexChar(char) - 1])
      }).forEach(move => {
        console.log(move);
        moves.push(move);
      });
      this.getLine({
        numberLogic: (number) => (+number + 1),
        charLogic: (char) => (charDimension[getIndexChar(char) + 1])
      }).forEach(move => {
        moves.push(move);
      });
      this.getLine({
        numberLogic: (number) => (+number - 1),
        charLogic: (char) => (charDimension[getIndexChar(char) + 1])
      }).forEach(move => {
        moves.push(move);
      });
      this.getLine({
        numberLogic: (number) => (+number + 1),
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
        ? require('@/assets/bishop-black.png')
        : require('@/assets/bishop-white.png');
    }
  }
};
