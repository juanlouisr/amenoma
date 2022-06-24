<script setup lang="ts">
import { useDataStore } from "@/stores/data";

const data = useDataStore();
</script>

<template>
  <div
    class="w-72 bg-gray-800 h-screen overflow-y-scroll no-scrollbar flex flex-col shrink-0"
  >
    <div class="w-full min-h-max p-3">
      <h1 class="text-white text-xl font-bold">{{ data.name }}</h1>
    </div>
    <hr class="bg-gray-700 border border-gray-700 rounded-full mx-2" />
    <div class="w-full min-h-max p-3">
      <h3
        class="text-white text-md font-bold"
        v-for="(chapter, index) in data.currNovel?.data"
        :key="chapter.name"
      >
        <router-link :to="`${data.getRouteName}/${index + 1}`">{{
          chapter.name
        }}</router-link>
      </h3>
    </div>
  </div>
</template>
