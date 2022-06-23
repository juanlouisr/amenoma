<script setup lang="ts">
import { ref } from "@vue/reactivity";

var show = ref(false);
defineEmits<{
  (e: "toggleSideControlBar", show: boolean): void;
}>();
function toggleShow() {
  show.value = !show.value;
  return show.value;
}
</script>

<template>
  <header class="flex bg-gray-900 shrink-0 h-16 w-full">
    <button
      class="burger my-auto mx-4 hover:cursor-pointer"
      @click="$emit('toggleSideControlBar', toggleShow())"
    >
      <div class="space-y-2">
        <div class="w-8 h-0.5 bg-white"></div>
        <div class="w-8 h-0.5 bg-white"></div>
        <div class="w-8 h-0.5 bg-white"></div>
      </div>
    </button>
    <h1 class="my-auto mx-3 font-bold text-white">Judul animu</h1>
  </header>
</template>
