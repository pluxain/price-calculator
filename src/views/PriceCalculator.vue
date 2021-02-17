<template>
  <section>
    <h1>Price Calculator</h1>

    <form>
      <fieldset>
        <legend>Price calculator</legend>
      </fieldset>
    </form>
  </section>
</template>

<style scoped>
section {
  @apply flex flex-col items-center;
}
form {
  @apply w-1/3 flex flex-row justify-center;
}
fieldset {
  @apply border flex w-full p-2;
}
legend {
  @apply px-2 text-left;
}
</style>
