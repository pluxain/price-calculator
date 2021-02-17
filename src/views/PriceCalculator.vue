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
        <div v-for="(field, i) in fields" class="field-input" :key="i">
          <label class="label">{{ field.label }}</label>
          <input
            type="number"
            class="input"
            step="0.01"
            min="0"
            id="basePrice"
            v-model.number="fields[i].price"
          />
        </div>
        <field-input
          v-model="newField"
          @add="add"
          :valid="valid"
          class="ghost"
        />
      </fieldset>
    </form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Field } from "@/types";
import FieldInput from "@/components/FieldInput.vue";
export default Vue.extend({
  components: { FieldInput },
  data(): { basePrice: number; newField: Field; fields: Field[] } {
    return {
      basePrice: 0.0,
      newField: { label: "", price: 0.0 },
      fields: []
    };
  },
  computed: {
    total(): number {
      return this.basePrice;
    },
    labelIsValid(): boolean {
      return this.newField.label.trim().length > 1;
    },
    priceIsValid(): boolean {
      return this.newField.price > 0;
    },
    valid(): boolean {
      return this.labelIsValid && this.priceIsValid;
    }
  },
  methods: {
    add(): void {
      console.log("add");
      this.fields = [...this.fields, this.newField];
      this.newField = { label: "", price: 0 };
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
</style>
