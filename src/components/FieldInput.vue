<template>
  <div
    class="field-input"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <input
      v-if="mode === 'ghost'"
      type="text"
      class="input"
      :class="mode"
      step="0.01"
      min="0"
      v-model.trim="value.label"
      @change="isValid ? $emit('add') : null"
    />
    <label v-if="mode === 'active'" class="label">{{ value.label }}</label>
    <input
      type="number"
      class="input"
      :class="mode"
      step="0.01"
      min="0"
      v-model.number="value.price"
      @input="value.price = handleMinimumPrice(value.price)"
      @change="isValid ? $emit('add') : null"
    />
    <span class="actions">
      <font-awesome-icon
        icon="times-circle"
        v-if="hovered"
        @click="$emit('remove')"
      />
    </span>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Field, Mode } from "@/types";
import minimum from "@/utils/price/minimum";
export default Vue.extend({
  props: {
    value: Object as PropType<Field>,
    mode: String as PropType<Mode>
  },
  data() {
    return { hovered: false };
  },
  computed: {
    labelIsValid(): boolean {
      return this.value.label.trim().length > 1;
    },
    priceIsValid(): boolean {
      return this.value.price > 0;
    },
    isValid(): boolean {
      return this.labelIsValid && this.priceIsValid;
    }
  },
  methods: {
    onMouseEnter(): void {
      if (this.mode === "active") {
        this.hovered = true;
      }
    },
    onMouseLeave(): void {
      if (this.mode === "active") {
        this.hovered = false;
      }
    },
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
.active {
  @apply border-black text-black;
}
</style>
