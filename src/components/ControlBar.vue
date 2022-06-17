<script setup lang="ts">
import type { ChapterData } from "@/models/main.model";
import { AzyNovelProvider } from "@/providers/azyNovel.provider";
import { ref, onMounted, reactive } from "vue";
const title = ref("");
const data = reactive({
  chapterData: [] as ChapterData[],
});

onMounted(async () => {
  const provider = new AzyNovelProvider();
  const ctn = await provider.load(
    "https://azynovel.com/chapter/under-the-oak-tree"
  );
  title.value = ctn.name ?? "unknown";
  data.chapterData = ctn.data;
});
</script>

<template>
  <div
    class="w-72 bg-gray-800 h-screen overflow-y-scroll no-scrollbar flex flex-col shrink-0"
  >
    <div class="w-full min-h-max p-3">
      <h1 class="text-white text-xl font-bold">{{ title }}</h1>
    </div>
    <hr class="bg-gray-700 border border-gray-700 rounded-full mx-2" />
    <div class="w-full min-h-max p-3">
      <h3
        class="text-white text-md font-bold"
        v-for="chapter in data.chapterData"
        v-bind:key="chapter.name"
      >
        <a :href="chapter.url">{{ chapter.name }}</a>
      </h3>
    </div>
  </div>
</template>
