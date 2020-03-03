<template lang="html">
  <div class="img-container">
    <img v-if="!active" @click="baseClickEvent" :src="sourceImg" alt="">
  </div>
</template>

<script>
import { charDimension, blockState } from '@/constants.js';
import { verifyBlockState, getIndexChar } from '@/helpers/fieldHelpers.js';

export default {
  data: () => ({
    isClicked: false
  }),
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
    triggerAfterMove() {
      if (this.afterMove) {
        this.afterMove()
      }
    },
    baseClickEvent() {
      if (this.showMoves) {
        this.showMoves()
      }
    },
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
    getFieldBlock({ char, number }) {
      if (this.field[char] && this.field[char][number]) {
        return this.field[char][number];
      }
      return null;
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
