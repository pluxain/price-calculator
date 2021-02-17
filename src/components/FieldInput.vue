<template>
  <div class="field-input">
    <input
      type="text"
      class="input ghost"
      step="0.01"
      min="0"
      v-model.trim="value.label"
      @change="valid ? $emit('add') : null"
    />
    <input
      type="number"
      class="input ghost"
      step="0.01"
      min="0"
      v-model.number="value.price"
      @input="value.price = handleMinimumPrice(value.price)"
      @change="valid ? $emit('add') : null"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Field } from "@/types";
import minimum from "@/utils/price/minimum";
export default Vue.extend({
  props: {
    value: Object as PropType<Field>,
    valid: Boolean
  },
  methods: {
    handleMinimumPrice(price: number): number {
      return minimum(price);
    }
  }
});
</script>

<style scoped>
.ghost {
  @apply border-gray-400 text-gray-400;
}
</style>
