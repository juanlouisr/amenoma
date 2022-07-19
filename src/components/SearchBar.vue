<script setup lang="ts">
defineProps<{
  submit: () => void;
  query: string;
  searching: boolean;
  input: (event: Event) => void;
}>();
</script>

<template>
  <form
    @submit.prevent="submit()"
    class="searchbar w-full md:w-2/3 mx-auto flex relative mb-1"
  >
    <div
      v-if="searching"
      class="loading absolute left-3 top-1.5 animate-spin h-7 w-7"
    >
      <img src="../assets/loading.png" alt="loading" class="object-fit" />
    </div>
    <img
      v-else
      src="../assets/search.png"
      alt="search"
      class="absolute left-2 top-1.5 h-4/6"
      loading="lazy"
    />
    <input
      class="rounded-full w-full h-11 text-xl shadow-lg overflow-x-hidden outline-none bg-gray-400 text-gray-700 px-12"
      :value="query"
      @input="input($event)"
      autofocus
    />
  </form>
</template>
