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
      :title="value.price"
      v-model.number="value.price"
      @input="handleMinimumPrice"
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
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { ActiveField, Mode } from "@/types";
import { format, minimum } from "@/utils/price";

@Component
export default class FieldInput extends Vue {
  @Prop({
    required: true
  })
  private value!: ActiveField;

  @Prop({
    default: "active"
  })
  private mode!: Mode;

  hovered = false;
  editing = false;
  oldLabel = "";

  get formatted() {
    return format(this.value.price);
  }

  get labelIsValid() {
    return this.value.label.trim().length > 1;
  }

  get priceIsValid() {
    return this.value.price > 0;
  }

  get isValid() {
    return this.labelIsValid && this.priceIsValid;
  }

  onMouseEnter() {
    if (this.mode === "active") {
      this.hovered = true;
    }
  }

  onMouseLeave() {
    if (this.mode === "active") {
      this.hovered = false;
    }
  }

  edit() {
    this.editing = true;
    this.oldLabel = this.value.label;
  }

  handleChange() {
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
  }

  handleMinimumPrice() {
    this.value.price = minimum(this.value.price);
  }
}
</script>

<style scoped>
.ghost {
  @apply border-gray-400 text-gray-400;
}
.active {
  @apply border-black text-black;
}
</style>
