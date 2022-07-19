<script setup lang="ts">
defineProps<{
  link: string;
  rating: number | null | undefined;
  name: string;
  latestChapter: string | null | undefined;
  posterurl: string | null | undefined;
}>();

const truncate = (text: string, stop: number) => {
  return text.slice(0, stop) + (stop < text.length ? "..." : "");
};
</script>

<template>
  <router-link :to="link">
    <div class="res-card h-64 w-40 flex flex-col relative rounded-md">
      <div class="rating flex flex-row w-4/12 absolute" v-if="rating ?? false">
        <h1 class="rating-score ml-3 mr-0.5">
          {{ rating?.toString }}
        </h1>
        <img src="@/assets/star.png" alt="star" class="h-3/5 my-auto" />
      </div>
      <img
        :src="posterurl ?? '#'"
        alt="poster"
        class="h-4/6 w-full object-fill rounded-top-md"
      />
      <h1 class="text-sm p-1">{{ truncate(name, 32) }}</h1>
      <h3 class="text-xs px-1 absolute bottom-3" v-if="latestChapter ?? false">
        Chapter {{ latestChapter }}
      </h3>
    </div>
  </router-link>
</template>

<style>
.rounded-top-md {
  border-radius: 0.375rem 0.375rem 0 0;
}

.res-card {
  background-color: #202225;
}

.rating {
  background-color: rgba(32, 34, 37, 0.88);
}
</style>
