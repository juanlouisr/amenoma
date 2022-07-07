<script setup lang="ts">
import SideBar from "@/components/SideBar.vue";
import ControlBar from "@/components/ControlBar.vue";
import NavBar from "@/components/NavBar.vue";
import { usePreferencesStore } from "./stores/preferences";

const preferences = usePreferencesStore();
</script>

<template>
  <div class="flex m-0 p-0 relative">
    <SideBar class="z-0" />
    <ControlBar class="z-0" />
    <div
      class="flex-grow h-screen flex flex-col overflow-x-hidden min-w-0 absolute z-20 content-wrapper"
      :class="{ opensidebar: preferences.isShowControlSideBar }"
    >
      <NavBar
        @toggle-side-control-bar="() => preferences.toggleControlSideBar()"
      ></NavBar>
      <RouterView class="content" />
    </div>
  </div>
</template>

<style>
.opensidebar {
  transition: left 0.3s ease-out, width 0.3s ease-out;
  left: 19rem !important;
  width: calc(100vw - 19rem) !important;
}

.content-wrapper {
  transition: left 0.3s ease-out, width 0.3s ease-out;
  width: 100vw;
  left: 0;
}
</style>
