<script setup lang="ts">
import { useNovelStore } from "@/stores/novel";

const nstore = useNovelStore();
</script>

<template>
  <!-- <div
    class="w-[97%] p-2 bg-gray-800 flex flex-wrap my-4 mx-auto py-4 gap-y-5 gap-x-5 justify-center rounded-md justify-items-center"
  > -->
  <div class="flex items-center justify-center">
    <router-link
      v-for="prov in nstore.providers"
      :to="`/novel/${prov.name}`"
      :key="prov.name"
    >
      {{ prov.name }}
    </router-link>
  </div>
  <!-- </div> -->
</template>
