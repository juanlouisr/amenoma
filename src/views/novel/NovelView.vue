<script setup lang="ts">
import { AzyNovelProvider } from "@/providers/azyNovel.provider";
import { ref, onBeforeMount } from "vue";

const loaded = ref(false);
const content = ref("");

onBeforeMount(async () => {
  const provider = new AzyNovelProvider();
  const ctn = await provider.loadContent(
    "https://azynovel.com/chapter/under-the-oak-tree/chapter-34-eyes-only-on-me-2"
  );
  content.value = ctn;
  loaded.value = true;
});
</script>

<template>
  <div>
    <div v-html="content"></div>
  </div>
</template>
