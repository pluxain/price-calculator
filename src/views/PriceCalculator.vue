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
          <PriceInput :value="basePrice" @input="basePrice = $event" />
          <span class="actions"></span>
        </div>
        <template v-for="(field, i) in fields">
          <FieldInput
            :mode="'active'"
            :field="fields[i]"
            :key="fields[i].id"
            @update="payload => update(fields[i].id, payload)"
            @remove="remove(fields[i].id)"
          />
        </template>
        <FieldInput @add="add" />
      </fieldset>
    </form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { v4 as uuidv4 } from "uuid";
import { ActiveField, Field } from "@/types";
import FieldInput from "@/components/FieldInput.vue";
import PriceInput from "@/components/PriceInput.vue";
import { format } from "@/utils/price";

@Component({
  components: { FieldInput, PriceInput }
})
export default class PriceCalculator extends Vue {
  basePrice = 1;
  fields: ActiveField[] = [];

  get total() {
    return format(
      this.fields.reduce((total, curr) => (total += curr.price), this.basePrice)
    );
  }

  add({ label, price }: Field) {
    this.fields = [...this.fields, { label, price, id: uuidv4() }];
  }

  remove(id: string) {
    this.fields = this.fields.filter(f => f.id !== id);
  }

  update(id: string, { label, price }: Field) {
    this.fields = this.fields.map(f => {
      return f.id === id ? { id, label, price } : f;
    });
  }
}
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
