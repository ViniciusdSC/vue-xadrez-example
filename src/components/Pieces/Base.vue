<template lang="html">
  <div class="img-container">
    <img v-if="!active" @click="showMoves" :src="sourceImg" alt="">
  </div>
</template>

<script>
import { charDimension, blockState } from '@/constants.js';
import { verifyBlockState, getIndexChar } from '@/helpers/fieldHelpers.js';

export default {
  computed: {
    sourceImg () {
      return null;
    },
    charIndex() {
      return getIndexChar(this.char);
    },
  },
  props: {
    isDark: {
      type: Boolean,
      default: true,
    },
    char: String,
    number: [Number, String],
    field: [Object, Array],
    active: Boolean,
  },
  methods: {
    getFieldBlock({ char, number }) {
      return this.field[char][number];
    },
    getBlock() {
      return { char: this.char, number: this.number };
    },
    getMove({ char, number }) {
      if (
        !charDimension[(+this.charIndex + char)] ||
        ((+this.number + number) < 1 && (+this.number + number) > 8)
      ) {
        return null;
      }
      return {
        char: charDimension[(+this.charIndex + char)],
        number: (+this.number + number)
      }
    },
    getMovesArray(...moves) {
      let arr = [];
      moves.forEach(move => {
        if (
          this.getMove(move) &&
          (verifyBlockState(this.getBlock(this.getMove(move)), this) !== blockState.ally) &&
          (verifyBlockState(this.getBlock(this.getMove(move)), this) !== blockState.null)
        ) {
          arr.push(this.getMove(move));
        }
      });
      return arr;
    },
  },
};
</script>

<style lang="css" scoped>
img {
  width: auto;
  height: 70%;
  cursor: pointer;
}
.img-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
