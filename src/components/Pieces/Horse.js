import Base from './Base.vue';
import { blockState } from '@/constants.js';
import { verifyBlockState } from '@/helpers/fieldHelpers.js';

export default {
  extends: Base,
  methods: {
    possibleMoves() {
      return this.getMovesArray(
        { char: -2, number: -1 },
        { char: -2, number: 1 },
        { char: 2, number: 1 },
        { char: 2, number: -1 },
        { char: 1, number: 2 },
        { char: -1, number: 2 },
        { char: -1, number: -2 },
        { char: 1, number: -2 }
      );
    },
    showMoves() {
      let moves = [];
      this.possibleMoves().forEach(move => {
        if (
          verifyBlockState(this.getFieldBlock(move), this) === blockState.enemy ||
          verifyBlockState(this.getFieldBlock(move), this) === blockState.blank
        ) {
          moves.push(move);
        }
      });
      this.$emit('showMoves', {
        char: this.char,
        number: this.number,
        moves,
        piece: this
      });
    }
  },
  computed: {
    sourceImg() {
      return this.isDark
        ? require('@/assets/horse-black.png')
        : require('@/assets/horse-white.png');
    }
  }
};
