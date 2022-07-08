<script setup lang="ts">
import { useDataStore } from "@/stores/data";

// BUG: data tidak terupdate setelah router link to next/prev chapter karena component navbar tidak terrefresh
// BUG: data tidak terupdate setelah ganti chapter dari controlbar karena component navbar tidak terrefresh
const data = useDataStore();
const judul = data.name || "Amenoma";
let next = data.getRouteNextChapter;
let prev = data.getRoutePrevChapter;
</script>

<template>
  <header class="flex bg-gray-900 shrink-0 h-16 w-full">
    <button
      class="burger my-auto mx-4 hover:cursor-pointer"
      @click="$emit('toggleSideControlBar')"
    >
      <div class="space-y-2">
        <div class="w-8 h-0.5 bg-white"></div>
        <div class="w-8 h-0.5 bg-white"></div>
        <div class="w-8 h-0.5 bg-white"></div>
      </div>
    </button>
    <h1 class="my-auto mx-3 font-bold text-white">{{ judul }}</h1>
    <div class="navi my-auto flex-grow flex justify-end">
      <router-link :to="prev">
        <button class="mr-1 bg-white py-2 px-3 rounded-3xl">&larr;Prev</button>
      </router-link>
      <router-link :to="next">
        <button class="ml-2 mr-3 bg-white py-2 px-3 rounded-3xl">
          Next&rarr;
        </button>
      </router-link>
    </div>
  </header>
</template>
