<script setup lang="ts">
import { useBookmarkStore, getBookmarkRoute } from "@/stores/bookmark";
import SideBarItem from "./SideBarItem.vue";

const bmStore = useBookmarkStore();
</script>

<template>
  <div
    class="sticky overflow-y-scroll h-screen min-w-max w-16 flex flex-col bg-gray-900 text-white shadow-lg no-scrollbar shrink-0"
  >
    <SideBarItem
      src="https://uxwing.com/wp-content/themes/uxwing/download/44-hand-gestures/good.png"
      title="about"
      path="/"
    />
    <SideBarItem
      src="https://static.vecteezy.com/system/resources/previews/001/200/145/original/books-png.png"
      title="novel"
      path="/novel"
    />
    <hr class="sidebar-hr" />
    <SideBarItem
      v-for="item in [...bmStore.bookmark.values()]"
      :key="getBookmarkRoute(item)"
      :src="item.currNovel?.posterUrl!"
      :data="item"
      :title="item.name"
    />
  </div>
</template>
