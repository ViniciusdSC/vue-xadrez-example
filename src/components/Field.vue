<template lang="html">
  <div class="field">
    <div v-for="(lines, linesIndex) in field" :key="linesIndex" class="field-line">
      <div
        v-for="(block, blockIndex) in lines"
        :key="blockIndex"
        class="field-line-block"
      >
        <active-block
          v-if="block.active"
          :char="linesIndex"
          :number="blockIndex"
          :clickedPiece="clickedPiece"
          @movePiece="movePiece"
        />
        <component
          v-else-if="block.component"
          :char="linesIndex"
          :number="blockIndex"
          :isDark="block.isDark"
          :is="block.component"
          :field="field"
          :active="block.active"
          @showMoves="showMoves"
        />
        <span v-else>{{ linesIndex }}{{ blockIndex }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Pawn from '@/components/Pieces/Pawn.js';
import ActiveBlock from '@/components/ActiveBlock.vue';
import { numberDimension, charDimension } from '@/constants';

export default {
  components: {
    Pawn,
    ActiveBlock
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
        this.$forceUpdate()
        this.hideMoves()
      }
    },
    showMoves(event) {
      this.hideMoves();
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
      this.clickedPiece = null;
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
      numberDimension.forEach((number) => {
        this.field[charDimension[1]][number] = {
          isDark: true,
          component: 'Pawn'
        };
        this.field[charDimension.slice(-2)[0]][number] = {
          isDark: false,
          component: 'Pawn'
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
