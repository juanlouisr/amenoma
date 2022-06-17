<script setup lang="ts">
import SideBar from "@/components/SideBar.vue";
import ControlBar from "@/components/ControlBar.vue";
import NavBar from "@/components/NavBar.vue";
import { ref } from "@vue/reactivity";
import { onMounted } from "vue";
import { getCorsProxyUrl } from "./models/novelAPI";

var showSideControlBar = ref<boolean>();

onMounted(async () => {
  await Promise.resolve(
    fetch(getCorsProxyUrl() + "https://indowebnovel.id", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36",
      },
    })
      .then((val) => val.text())
      .then((e) => console.log(e))
      .catch(console.log)
  );
});
</script>

<template>
  <div class="flex m-0 p-0">
    <Transition name="sidebar">
      <SideBar v-show="showSideControlBar" class="z-10" />
    </Transition>
    <Transition name="controlbar">
      <ControlBar v-show="showSideControlBar" class="z-0" />
    </Transition>
    <div class="flex-grow h-screen flex flex-col">
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
