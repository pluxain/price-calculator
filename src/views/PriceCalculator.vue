<template>
  <section>
    <h1>Price Calculator</h1>

    <form>
      <fieldset>
        <legend>Price calculator</legend>
        <h2>Total: {{ total }} EUR/KG</h2>
        <div class="field-input">
          <label for="basePrice" class="label">Baseprice</label>
          <span class="actions"></span>
          <input
            type="number"
            class="input"
            step="0.01"
            min="0"
            id="basePrice"
            v-model.number="basePrice"
            @input="basePrice = handleMinimumPrice(basePrice)"
          />
          <span class="actions"></span>
        </div>
        <template v-for="(field, i) in fields">
          <field-input
            v-model="fields[i]"
            :mode="'active'"
            :key="fields[i].id"
            @remove="remove(fields[i].id)"
          />
        </template>
        <field-input v-model="newField" @add="add" :mode="'ghost'" />
      </fieldset>
    </form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { v4 as uuidv4 } from "uuid";
import { ActiveField, Field } from "@/types";
import FieldInput from "@/components/FieldInput.vue";
import minimum from "@/utils/price/minimum";
export default Vue.extend({
  components: { FieldInput },
  data(): { basePrice: number; newField: Field; fields: ActiveField[] } {
    return {
      basePrice: 1,
      newField: { label: "", price: 0.0 },
      fields: []
    };
  },
  computed: {
    total(): number {
      return this.fields.reduce(
        (total, curr) => (total += curr.price),
        this.basePrice
      );
    }
  },
  methods: {
    handleMinimumPrice(price: number): number {
      return minimum(price);
    },
    add(): void {
      this.fields = [...this.fields, { ...this.newField, id: uuidv4() }];
      this.newField = { label: "", price: 0 };
    },
    remove(id: string): void {
      this.fields = this.fields.filter(f => f.id !== id);
    }
  }
});
</script>
<style scoped>
h1 {
  @apply text-2xl my-2;
}
h2 {
  @apply text-xl text-right font-semibold my-2 pr-10;
}
form {
  @apply mx-80 flex flex-row justify-center;
}
fieldset {
  @apply border flex flex-col w-full p-2;
}
legend {
  @apply px-2 text-left text-xl;
}
</style>
