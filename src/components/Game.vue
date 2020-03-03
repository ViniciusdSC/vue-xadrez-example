<template lang="html">
  <div class="game">
    <div class="game-header">
      {{ player1.getName() }} vs {{ player2.getName() }}
    </div>
    <div class="game-body">
      <field
        @killPiece="killPiece"
      />
    </div>
    <div class="game-player1">
      <component class="piece" v-for="(piece, index) in player2.pieces" :key="index" :is="piece" />
    </div>
    <div class="game-player2">
      <component class="piece" v-for="(piece, index) in player1.pieces" :key="index" :is="piece" />
    </div>
  </div>
</template>

<script>
import Field from '@/components/Field.vue';
import Player from '@/entitys/player.js';
import Pawn from '@/components/Pieces/Pawn.js';
import Horse from '@/components/Pieces/Horse.js';
import Tower from '@/components/Pieces/Tower.js';
import Bishop from '@/components/Pieces/Bishop.js';
import Queen from '@/components/Pieces/Queen.js';
import King from '@/components/Pieces/King.js';

export default {
  components: {
    Field,
    Horse,
    Pawn,
    Tower,
    Bishop,
    Queen,
    King,
  },
  data: () => ({
    player1: Player('Player1'),
    player2: Player('Player2')
  }),
  methods: {
    killPiece (block) {
      let player = block.isDark ? this.player2 : this.player1;
      player.addPiece(block.component);
    }
  }
}
</script>

<style lang="scss" scoped>
.game {
  display: grid;
  grid-template: "header header header" "player1 body player2";
  grid-template-columns: auto 450px auto;
  grid-template-rows: auto;
  &-body {
    grid-area: body;
  }
  &-header {
    grid-area: header;
  }
  &-player1 {
    grid-area: player1;
    display: flex;
    align-items: end;
    flex-direction: column;
  }
  &-player2 {
    grid-area: player2;
    display: flex;
    align-items: start;
    flex-direction: column;
  }
}
.piece {
  height: 50px;
  pointer-events: none;
  cursor: default;
}
</style>
