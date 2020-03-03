<template lang="html">
  <div class="field">
    <div v-for="(lines, linesIndex) in field" :key="linesIndex" class="field-line">
      <div
        v-for="(block, blockIndex) in lines"
        :key="blockIndex"
        class="field-line-block"
      >
        <active-block
          :ref="`block-${linesIndex}-${blockIndex}`"
          v-if="block.active"
          :char="linesIndex"
          :number="blockIndex"
          :clickedPiece="clickedPiece"
          @movePiece="movePiece"
        />
        <component
          :ref="`block-${linesIndex}-${blockIndex}`"
          v-else-if="block.component"
          :char="linesIndex"
          :number="blockIndex"
          :isDark="block.isDark"
          :is="block.component"
          :field="field"
          :active="block.active"
          @showMoves="handlePieceClick"
        />
        <span
          :ref="`block-${linesIndex}-${blockIndex}`"
          v-else
        >{{ linesIndex }}{{ blockIndex }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Pawn from '@/components/Pieces/Pawn.js';
import Horse from '@/components/Pieces/Horse.js';
import Tower from '@/components/Pieces/Tower.js';
import Bishop from '@/components/Pieces/Bishop.js';
import Queen from '@/components/Pieces/Queen.js';
import King from '@/components/Pieces/King.js';
import ActiveBlock from '@/components/ActiveBlock.vue';
import { numberDimension, charDimension } from '@/constants';

export default {
  components: {
    ActiveBlock,
    Horse,
    Pawn,
    Tower,
    Bishop,
    Queen,
    King
  },
  data: () => ({
    field: [],
    clickedPiece: null,
  }),
  beforeMount() {
    this.initialize();
  },
  methods: {
    getBlock({ char, number }) {
      return this.field[char][number];
    },
    setBlock({ char, number }, value) {
      this.field[char][number] = value;
    },
    onClick(active, char, number) {
      if (active) {
        this.movePiece(this.clickedPiece, { char, number });
      }
    },
    movePiece(from, to) {
      if ((from.char !== to.char) || (from.number !== to.number)) {
        let toBlock = this.getBlock(to);
        let fromBlock = this.getBlock(from);
        if (toBlock.component) {
          if (toBlock.isDark === fromBlock.isDark) {
            throw new Error('It\'s not possible to kill your piece');
          }
          this.cleanBlock(to);
          this.$emit('killPiece', toBlock);
        }
        this.setBlock(to, fromBlock);
        this.cleanBlock({ char: from.char, number: from.number });
        this.$forceUpdate();
        this.hideMoves();
        setTimeout(() => {
          this.$refs[`block-${to.char}-${to.number}`][0].triggerAfterMove()
        })
      }
    },
    handlePieceClick(event) {
      this.hideMoves();
      if (this.clickedPiece !== event.piece) {
        this.showMoves(event);
      } else {
        this.clickedPiece = null;
      }
    },
    showMoves(event) {
      this.clickedPiece = event.piece;
      event.moves.forEach((field) => {
        if (this.field[field.char][field.number]) {
          this.field[field.char][field.number].active = true;
        }
      })
      this.$forceUpdate()
    },
    hideMoves() {
      charDimension.forEach((char) => {
        numberDimension.forEach((number) => {
          this.field[char][number].active = false;
        });
      });
      this.$forceUpdate()
    },
    initialize() {
      this.cleanField();
      this.setUpField();
    },
    cleanField() {
      this.field = {};
      charDimension.forEach((char) => {
        this.field[char] = {};
        numberDimension.forEach((number) => {
          this.cleanBlock({ char, number });
        });
      });
    },
    cleanBlock({ char, number }) {
      this.setBlock({ char, number }, {
        component: null,
        active: false
      });
    },
    setUpField() {
      const firstLineOrder = ['Tower', 'Horse', 'Bishop', 'Queen', 'King', 'Bishop', 'Horse', 'Tower'];
      numberDimension.forEach((number, index) => {
        this.field[charDimension[1]][number] = {
          isDark: true,
          component: 'Pawn'
        };
        this.field[charDimension[0]][number] = {
          isDark: true,
          component: firstLineOrder[index]
        };
        this.field[charDimension.slice(-2)[0]][number] = {
          isDark: false,
          component: 'Pawn'
        };
        this.field[charDimension.slice(-1)[0]][number] = {
          isDark: false,
          component: firstLineOrder[index]
        };
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.active {
  background-color: yellow !important;
  cursor: pointer;
}
.field {
  display: inline-flex;
  flex-direction: column;
  &-line {
    display: inline-flex;
    flex-direction: rows;
    &-block {
      color: white;
      width: 50px;
      height: 50px;
      margin: 1px;
    }
    &:nth-child(even) &-block {
      background-color: #8B8B83;
      &:nth-child(odd) {
        background-color: #CDB38B;
      }
    }
    &:nth-child(odd) &-block {
      background-color: #8B8B83;
      &:nth-child(even) {
        background-color: #CDB38B;
      }
    }
  }
}
</style>
