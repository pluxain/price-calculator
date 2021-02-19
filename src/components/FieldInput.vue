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
      v-model.trim="label"
      @change="onChange"
      @blur="onChange"
    />
    <label
      v-if="mode === 'active' && !editing"
      class="label truncate"
      :title="label"
      >{{ label }}</label
    >
    <span class="actions">
      <font-awesome-icon icon="pen" v-if="hovered && !editing" @click="edit" />
    </span>
    <PriceInput
      :class="mode"
      :value="price"
      @input="price = $event"
      @change="onChange"
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
import { Field, Mode } from "@/types";
import { never } from "@/utils/error";
import { format } from "@/utils/price";
import PriceInput from "@/components/PriceInput.vue";

@Component({
  components: {
    PriceInput
  }
})
export default class FieldInput extends Vue {
  @Prop({
    default: function() {
      return { label: "", price: 0 };
    }
  })
  private readonly field!: Field;

  @Prop({
    default: "ghost"
  })
  private mode!: Mode;

  hovered = false;
  editing = false;
  price = this.field.price;

  get formatted() {
    return format(this.price);
  }

  get label() {
    return this.field.label;
  }

  set label(label: string) {
    const trimed = label.trim();
    if (this.field.label === "") {
      this.field.label = trimed;
    } else if (trimed.length > 0) {
      this.field.label = trimed;
    }
  }

  get isLabelValid() {
    return this.label.trim().length > 1;
  }

  get isPriceValid() {
    return this.price > 0;
  }

  get isValid() {
    return this.isLabelValid && this.isPriceValid;
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

  onChange() {
    if (this.isValid) {
      const { label, price } = this;
      switch (this.mode) {
        case "ghost":
          this.$emit("add", { label, price });
          this.price = 0;
          // probably not the cleanest way...
          this.field.label = "";
          break;
        case "active":
          this.$emit("update", { label, price });
          this.editing = false;
          break;
        default:
          throw never("Unhandled mode", this.mode);
      }
    }
  }

  edit() {
    this.editing = true;
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
