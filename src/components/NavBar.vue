<script setup lang="ts">
import { useDataStore } from "@/stores/data";
import { MenuIcon } from "@heroicons/vue/outline";
// import { ChevronRightIcon } from "@heroicons/vue/solid";

const data = useDataStore();
</script>

<template>
  <header
    class="flex bg-gray-700 shrink-0 h-16 w-full border-b border-gray-900"
  >
    <button
      class="w-9 my-auto mx-4 hover:cursor-pointer shrink-0"
      @click="$emit('toggleSideControlBar')"
    >
      <MenuIcon class="text-white" />
    </button>
    <!-- <router-link class="my-auto mx-1 font-bold text-white" :to="`/${data.type}`"
      >{{ data.type }}
    </router-link>
    <ChevronRightIcon v-if="data.type" class="w-5 text-white" />
    <router-link
      v-if="data.type"
      class="my-auto mx-1 font-bold text-white"
      :to="`/${data.type}/${data.provider}`"
    >
      {{ data.provider }}
    </router-link>
    <ChevronRightIcon
      v-if="data.type && data.provider"
      class="w-5 text-white"
    />
    <router-link
      v-if="data.type && data.provider"
      class="my-auto mx-1 font-bold text-white"
      :to="data.getRouteName"
    >
      {{ data.name }}
    </router-link> -->
    <h1 class="my-auto mx-3 font-bold text-white">
      {{ data.name || "Amenoma" }}
    </h1>
    <div class="navi my-auto flex-grow flex justify-end" v-if="data.name">
      <router-link :to="data.getRoutePrevChapter">
        <button class="mr-1 bg-white py-2 px-3 rounded-3xl">&larr;Prev</button>
      </router-link>
      <router-link :to="data.getRouteNextChapter">
        <button class="ml-2 mr-3 bg-white py-2 px-3 rounded-3xl">
          Next&rarr;
        </button>
      </router-link>
    </div>
  </header>
</template>
