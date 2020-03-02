<template lang="html">
  <div @click="movePice" class="active-block"></div>
</template>

<script>
export default {
  props: {
    char: String,
    number: [Number, String],
    clickedPiece: [Object]
  },
  methods: {
    movePice() {
      this.$emit('movePiece', this.clickedPiece.getBlock(), { char: this.char, number: this.number });
    }
  }
}
</script>

<style lang="css" scoped>
.active-block {
  width: 100%;
  height: 100%;
  background-color: #FFD700;
  cursor: pointer;
}
</style>
