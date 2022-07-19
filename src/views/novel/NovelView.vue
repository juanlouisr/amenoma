<script setup lang="ts">
import { useDataStore } from "@/stores/data";
import { useNovelStore } from "@/stores/novel";

const data = useDataStore();
const nstore = useNovelStore();

data.$reset();
</script>

<template>
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
