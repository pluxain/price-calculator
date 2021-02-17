<template>
  <section>
    <h1>Price Calculator</h1>

    <form>
      <fieldset>
        <legend>Price calculator</legend>
        <h2>Total: {{ total }} EUR/KG</h2>
        <div class="field-input">
          <label for="basePrice" class="label">Baseprice</label>
          <input
            type="number"
            class="input"
            step="0.01"
            min="0"
            id="basePrice"
            v-model.number="basePrice"
          />
        </div>
        <div class="field-input">
          <input
            type="text"
            class="input ghost"
            step="0.01"
            min="0"
            v-model.trim="newField.label"
          />
          <input
            type="number"
            class="input ghost"
            step="0.01"
            min="0"
            v-model.number="newField.value"
          />
        </div>
      </fieldset>
    </form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Field } from "@/types";
export default Vue.extend({
  data(): { basePrice: number; newField: Field } {
    return {
      basePrice: 0.0,
      newField: { label: "", price: 0.0 }
    };
  },
  computed: {
    total(): number {
      return this.basePrice;
    }
  }
});
</script>
<style scoped>
section {
  @apply flex flex-col items-center;
}
h1 {
  @apply text-2xl my-2;
}
h2 {
  @apply text-xl text-right font-semibold my-2;
}
form {
  @apply w-1/3 flex flex-row justify-center;
}
fieldset {
  @apply border flex flex-col w-full p-2;
}
legend {
  @apply px-2 text-left;
}
.field-input {
  @apply flex flex-row w-full mt-2;
}
.label {
  @apply w-1/2 text-left px-2;
}
.input {
  @apply border flex-grow ml-2 px-1 border-black;
}
.ghost {
  @apply border-gray-400;
}
</style>
