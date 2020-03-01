<template lang="html">
  <div class="field">
    <div v-for="(lines, linesIndex) in field" :key="linesIndex" class="field-line">
      <div
        v-for="(block, blockIndex) in lines"
        :key="blockIndex"
        :class="(block.active ? 'active ' : '') + 'field-line-block'"
        @click="onClick(block.active, linesIndex, blockIndex)"
      >
        <component
          v-if="block.component"
          :char="linesIndex"
          :number="blockIndex"
          :isDark="block.isDark"
          :is="block.component"
          :field="field"
          :active="block.active"
          @showMoves="showMoves"
        />
        <span v-else>ok</span>
      </div>
    </div>
  </div>
</template>

<script>
import Pawn from '@/components/Pieces/Pawn.js';
import { numberDimension, charDimension } from '@/constants';

export default {
  components: {
    Pawn
  },
  data: () => ({
    field: [],
    clickedPiece: null,
  }),
  beforeMount() {
    this.initialize();
  },
  methods: {
    onClick(active, char, number) {
      if (active) {
        this.movePiece(this.clickedPiece, { char, number });
      }
    },
    movePiece(from, to) {
      if ((from.char !== to.char) || (from.number !== to.number)) {
        if (this.field[to.char][to.number].component) {
          if (
            this.field[to.char][to.number].component.isDark
            === this.field[from.char][from.number].component.isDark
          ) {
            throw new Error('It\'s not possible to kill your piece');
          }
          this.$emit('killPiece', this.field[to.char][to.number]);
        }
        // FIXME: REFACTOR THIS
        let tempField = JSON.parse(JSON.stringify(this.field[to.char][to.number]));
        this.field[to.char][to.number] = this.field[from.char][from.number];
        this.field[from.char][from.number] = tempField;
        // FIXME: Find a better way to active vue reactive
        this.field = JSON.parse(JSON.stringify(this.field));
        this.hideMoves()
      }
    },
    showMoves(piece, fields) {
      this.hideMoves();
      this.clickedPiece = piece;
      fields.forEach((field) => {
        if (this.field[field.char][field.number]) {
          this.field[field.char][field.number].active = true;
        }
      })
      // FIXME: Find a better way to active vue reactive
      this.field = JSON.parse(JSON.stringify(this.field));
    },
    hideMoves() {
      charDimension.forEach((char) => {
        numberDimension.forEach((number) => {
          this.field[char][number].active = false;
        });
      });
      this.clickedPiece = null;
      // FIXME: Find a better way to active vue reactive
      this.field = JSON.parse(JSON.stringify(this.field));
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
          this.field[char][number] = {
            component: null,
            active: false
          };
        });
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
