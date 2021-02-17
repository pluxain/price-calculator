<template>
  <div
    class="field-input"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <input
      v-if="mode === 'ghost' || editing"
      type="text"
      class="input"
      :class="mode"
      v-model.trim="value.label"
      @change="handleChange"
      @blur="handleChange"
    />
    <label
      v-if="mode === 'active' && !editing"
      class="label truncate"
      :title="value.label"
      >{{ value.label }}</label
    >
    <span class="actions">
      <font-awesome-icon icon="pen" v-if="hovered && !editing" @click="edit" />
    </span>
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
import { ActiveField, Mode } from "@/types";
import minimum from "@/utils/price/minimum";
export default Vue.extend({
  props: {
    value: Object as PropType<ActiveField>,
    mode: String as PropType<Mode>
  },
  data() {
    return { hovered: false, editing: false, oldLabel: "" };
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
    edit(): void {
      this.editing = true;
      this.oldLabel = this.value.label;
    },
    handleChange(): void {
      if (this.editing) {
        this.editing = false;
        // we do not clean oldLabel on purpose as it is set on edit anyway
        if (!this.labelIsValid) {
          this.value.label = this.oldLabel;
        }
      }
      if (this.mode === "ghost" && this.isValid) {
        this.$emit("add");
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
