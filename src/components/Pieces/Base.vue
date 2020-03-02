<template lang="html">
  <div class="img-container">
    <img v-if="!active" @click="showMoves" :src="sourceImg" alt="">
  </div>
</template>

<script>
export default {
  computed: {
    sourceImg () {
      return null;
    }
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
    showMoves() {
      this.$emit('showMoves');
    },
    getBlock() {
      return { char: this.char, number: this.number };
    }
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
