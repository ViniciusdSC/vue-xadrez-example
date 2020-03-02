import Base from './Base.vue';
import { blockState } from '@/constants.js';
import { verifyBlockState } from '@/helpers/fieldHelpers.js';

export default {
  extends: Base,
  methods: {
    possibleMoves() {
      return this.getMovesArray(
        { char: -1, number: -1 },
        { char: -1, number: 1 },
        { char: 1, number: -1 },
        { char: 1, number: 1 },
        { char: 1, number: 0 },
        { char: 0, number: 1 },
        { char: -1, number: 0 },
        { char: 0, number: -1 }
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
      this.$emit('showMoves', { char: this.char, number: this.number, moves, piece: this });
    }
  },
  computed: {
    sourceImg() {
      return this.isDark
        ? require('@/assets/king-black.png')
        : require('@/assets/king-white.png');
    }
  }
};
