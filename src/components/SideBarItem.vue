<script setup lang="ts">
defineProps<{
  src: string;
  title: string;
  type: string;
}>();
</script>

<template>
  <router-link :to="{ name: type }">
    <div
      class="relative flex items-center justify-center h-12 w-12 m-2 mx-auto group"
    >
      <img v-bind:src="src" class="sidebar-icon" v-bind:title="title" />
      <!-- <div class="sidebar-tooltip group-hover:scale-100">{{ title }}</div> -->
    </div>
  </router-link>
</template>
