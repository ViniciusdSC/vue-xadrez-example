<template lang="html">
  <div v-for="fields in matrizField" class="field">
    <div v-for="field in fields" class="">
      <component v-bind:is="field" />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    matrizField: []
  }),
  methods: {
    initialize () {
      matrizField = []
      for (let i; i < 8; i++) {
        matrizField[i] = []
        for (let j; j < 8;  j++) {
          matrizField[i][j] = ''
        }
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
