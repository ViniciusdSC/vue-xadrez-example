import Base from './Base.vue';
import { blockState } from '@/constants.js';
import { verifyBlockState } from '@/helpers/fieldHelpers.js';

export default {
  extends: Base,
  methods: {
    showMoves() {
      let moves = [];
      let sign = this.isDark ? 1 : -1;
      let moveFrontOne = this.getMove({ char: sign, number: 0 });
      let moveFrontTwo = this.getMove({ char: (2 * sign), number: 0 });
      let moveFrontOneLeftOne = this.getMove({ char: sign, number: -1 });
      let moveFrontOneRightOne = this.getMove({ char: sign, number: 1 });
      if (verifyBlockState(this.getFieldBlock(moveFrontOne), this) === blockState.blank) {
        moves.push(moveFrontOne);
        if (
          ((this.getBlock().char === 'B' && this.isDark) ||
          (this.getBlock().char === 'G' && !this.isDark)) &&
          verifyBlockState(this.getFieldBlock(moveFrontTwo), this) === blockState.blank
        ) {
          moves.push(moveFrontTwo);
        }
      }
      if (verifyBlockState(this.getFieldBlock(moveFrontOneLeftOne), this) === blockState.enemy) {
        moves.push(moveFrontOneLeftOne);
      }
      if (verifyBlockState(this.getFieldBlock(moveFrontOneRightOne), this) === blockState.enemy) {
        moves.push(moveFrontOneRightOne);
      }
      this.$emit('showMoves', { char: this.char, number: this.number, moves, piece: this })
    }
  },
  computed: {
    sourceImg() {
      return this.isDark
        ? require('@/assets/pawn-black.png')
        : require('@/assets/pawn-white.png');
    }
  }
}
