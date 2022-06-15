<script setup lang="ts">
import SideBar from "@/components/SideBar.vue";
import ControlBar from "@/components/ControlBar.vue";
</script>

<template>
  <div class="flex m-0 p-0">
    <SideBar />
    <ControlBar />
    <RouterView />
  </div>
</template>
