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
  @apply flex flex-row items-center w-full mt-2;
}
.label {
  @apply mx-2 flex-1 p-1 text-left;
}
.input {
  @apply border w-1/2 flex-1 mx-2 p-1 border-black outline-none;
}
.actions {
  @apply w-8;
}
</style>
