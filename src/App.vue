<script setup lang="ts">
import SideBar from "@/components/SideBar.vue";
import ControlBar from "@/components/ControlBar.vue";
import NavBar from "@/components/NavBar.vue";
import { ref } from "@vue/reactivity";
import { usePreferencesStore } from "./stores/preferences";

const preferences = usePreferencesStore();

</script>

<template>
  <div class="flex m-0 p-0">
    <Transition name="sidebar">
      <SideBar v-show="preferences.isShowControlSideBar" class="z-10" />
    </Transition>
    <Transition name="controlbar">
      <ControlBar v-show="preferences.isShowControlSideBar" class="z-0" />
    </Transition>
    <div class="flex-grow h-screen flex flex-col overflow-x-hidden min-w-0">
      <NavBar @toggle-side-control-bar="() => (preferences.toggleControlSideBar())"></NavBar>
      <RouterView/>
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
