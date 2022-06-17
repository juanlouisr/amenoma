<script setup lang="ts">
import { AzyNovelProvider } from "@/providers/azyNovel.provider";
import { ref, onMounted } from "vue";

const loaded = ref(false);
const content = ref("");

onMounted(async () => {
  const provider = new AzyNovelProvider();
  const ctn = await provider.loadContent(
    "https://azynovel.com/chapter/under-the-oak-tree/chapter-1-his-return"
  );
  content.value = ctn;
  loaded.value = true;
});
</script>

<template>
  <div class="content">
    <div v-html="content"></div>
  </div>
</template>
