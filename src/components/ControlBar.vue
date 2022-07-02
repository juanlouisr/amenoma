<script setup lang="ts">
import { computed } from "vue";
import { useBookmarkStore } from "@/stores/bookmark";
import { useDataStore } from "@/stores/data";
import { BookmarkIcon } from "@heroicons/vue/outline";

const data = useDataStore();
const bmS = useBookmarkStore();
const bookmarkAction = () => {
  if (!bmS.getBookmark(data.getRouteName)) {
    bmS.insertBookmark(data.copyState);
    console.log("insering bookmark");
  } else {
    bmS.deleteBookmark(data.getRouteName);
    console.log("deleting bookmark");
  }
};
const bookmarked = computed(() => bmS.getBookmark(data.getRouteName));
</script>

<template>
  <div
    class="w-72 bg-gray-800 h-screen overflow-y-scroll no-scrollbar flex flex-col shrink-0"
  >
    <div class="w-full min-h-max p-3 flex justify-between">
      <h1 class="text-white text-xl font-bold">
        {{ data.name }}
      </h1>

      <button
        v-if="data.name && data.provider && data.type"
        class="w-8 shrink-0"
        @click="bookmarkAction()"
        title="bookmark"
      >
        <BookmarkIcon
          class="text-white"
          :class="bookmarked ? 'fill-white' : ''"
        />
      </button>
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
