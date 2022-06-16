<script setup lang="ts">
import SideBar from "@/components/SideBar.vue";
import ControlBar from "@/components/ControlBar.vue";
import NavBar from "@/components/NavBar.vue";
import { ref } from "@vue/reactivity";

var showSideControlBar = ref<boolean>();
</script>

<template>
  <div class="flex m-0 p-0 ab">
    <Transition name="sidebar">
      <SideBar v-show="showSideControlBar" class="z-10" />
    </Transition>
    <Transition name="controlbar">
      <ControlBar v-show="showSideControlBar" class="z-0" />
    </Transition>
    <div class="flex-1 h-screen contain">
      <NavBar
        @toggle-side-control-bar="(show) => (showSideControlBar = show)"
      ></NavBar>
      <RouterView />
    </div>
  </div>
</template>

<style>
.sidebar-enter-active {
  transition: all 0.1s ease-in;
}

.sidebar-leave-active {
  transition: all 0.1s ease-in;
  transition-delay: 0.1s;
}

.sidebar-enter-from {
  transform: translateX(-100%);
}

.sidebar-leave-to {
  transform: translateX(-100%);
}

.controlbar-enter-active {
  transition: all 0.1s ease-in;
  transition-delay: 0.1s;
}

.controlbar-leave-active {
  transition: all 0.1s ease-in;
}

.controlbar-enter-from {
  transform: translateY(-100%);
}

.controlbar-leave-to {
  transform: translateY(-100%);
}
</style>
