<template>
  <input
    type="number"
    class="input"
    step="0.01"
    min="0"
    :title="price"
    :value="focused ? price : formatted"
    @focus="focused = true"
    @blur="focused = false"
    @change="$emit('change')"
    v-debounce:200ms="onInput"
    :debounce-events="['input']"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { format, minimum } from "@/utils/price";

@Component
export default class PriceInput extends Vue {
  @Prop({ default: 0 })
  private value!: number;

  focused = false;

  get price() {
    return this.value;
  }

  get formatted() {
    return format(this.price);
  }

  onInput(value: string, event: InputEvent) {
    const price = minimum(parseFloat(value));
    if (price !== this.price) {
      // We want to emit only if price changed really
      this.$emit("input", price);
    } else {
      // we reaffect the input value in case some negative number was entered
      const t = event.target as HTMLInputElement;
      t.value = String(this.price);
    }
  }
}
</script>
