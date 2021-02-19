<template>
  <input
    type="number"
    class="input"
    step="0.01"
    min="0"
    :title="price"
    :value="price"
    @input="onInput"
    @change="$emit('change')"
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

  get price() {
    return this.value;
  }

  get formatted() {
    return format(this.price);
  }

  onInput(event: InputEvent) {
    const t = event.target as HTMLInputElement;
    const price = minimum(parseFloat(t.value));
    if (price !== this.price) {
      // We want to emit only if price changed really
      this.$emit("input", price);
    } else {
      // we reaffect the input value in case some negative number was entered
      t.value = String(this.price);
    }
  }
}
</script>
