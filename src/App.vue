<template>
  <div id="app">
    <price-calculator />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PriceCalculator from "./views/PriceCalculator.vue";

export default Vue.extend({
  components: { PriceCalculator },
  name: "App"
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
