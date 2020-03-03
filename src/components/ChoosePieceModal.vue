<template lang="html">
  <b-modal ref="modal">
    <template v-slot:modal-header="{ close }">
      <h5 class="title">Escolha uma peça para o bonus do peão</h5>
      <span @click="close" class="close"><font-awesome-icon icon="times" /></span>
    </template>
    <div class="modal-body">
      <b-form-radio v-model="selected" value="Tower">
        <img src="@/assets/tower-black.png" alt="">
      </b-form-radio>
      <b-form-radio v-model="selected" value="Horse">
        <img src="@/assets/horse-black.png" alt="">
      </b-form-radio>
      <b-form-radio v-model="selected" value="Bishop">
        <img src="@/assets/bishop-black.png" alt="">
      </b-form-radio>
      <b-form-radio v-model="selected" value="Queen">
        <img src="@/assets/queen-black.png" alt="">
      </b-form-radio>
    </div>
    <template v-slot:modal-footer>
      <b-button
        @click="choosePiece"
        :disabled="!selected"
        variant="outline-primary"
      >Escolher peça</b-button>
    </template>
  </b-modal>
</template>

<script>
import {
  BModal,
  BFormRadio,
  BButton
} from 'bootstrap-vue';

export default {
  components: {
    BModal,
    BFormRadio,
    BButton
  },
  data: () => ({
    selected: null,
    piece: null
  }),
  methods: {
    show(piece) {
      this.piece = piece;
      this.$refs.modal.show();
    },
    choosePiece() {
      this.piece.component = this.selected;
      this.$emit('updatePiece', this.piece);
      this.$refs.modal.hide();
    }
  }
}
</script>

<style lang="css" scoped>
.modal-header {
  padding: 10px;
  display: flex;
  align-items: center;
}
.modal-header .title {
  margin: 0px;
}
.modal-header .close {
  margin-left: auto;
  cursor: pointer;
}
.modal-body {
  display: flex;
  justify-content: space-around;
}
img {
  height: 30px;
}
</style>
