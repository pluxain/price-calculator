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

.field-input {
  @apply flex flex-row w-full mt-2;
}
.label {
  @apply w-1/2 text-left px-2;
}
.input {
  @apply border flex-grow ml-2 px-1 border-black outline-none;
}
</style>
