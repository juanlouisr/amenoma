<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import type { BookmarkData } from "@/models/main.model";
import { getBookmarkRoute } from "@/stores/bookmark";

const props = defineProps<{
  data?: BookmarkData;
  src: string;
}>();

const route = useRoute();

const isActive = computed<boolean>(() => {
  if (props.data) {
    return route.path.includes(getBookmarkRoute(props.data));
  }
  return route.path === "/";
});
</script>

<template>
  <router-link
    :to="
      data ? '/' + data.type + '/' + data.provider + '/' + data.nameRoute : '/'
    "
  >
    <div
      class="relative flex items-center justify-center h-12 w-12 my-2 mr-2 group"
    >
      <div
        class="active-link"
        :class="{ active: isActive, inactive: !isActive }"
      ></div>
      <img
        :src="props.src"
        class="sidebar-icon"
        :class="[isActive ? 'sidebar-active' : '']"
        :title="data?.name ?? 'about'"
      />
      <!-- <div class="sidebar-tooltip group-hover:scale-100">{{ title }}</div> -->
    </div>
  </router-link>
</template>

<style scoped>
.active-link {
  float: left;
  padding-right: 0.4rem;
  margin-right: 0.2rem;
  background-color: white;
  border-radius: 0 25px 25px 0;
}
.active {
  height: 90%;
}
.inactive {
  height: 0%;
}
</style>
