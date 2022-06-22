<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNovelStore } from "@/stores/novel";
import { useDataStore } from "@/stores/data";
import type { SearchResponse } from "@/models/main.model";

const query = ref("");
const searching = ref(false);
const searchResult = ref<SearchResponse[]>([]);
const data = useDataStore();
const novelAPI = useNovelStore();
const route = useRoute();
const router = useRouter();

const provider = route.params.provider as string;
onBeforeMount(() => {
  loadProvider();
});

function loadProvider() {
  novelAPI.updateProvider(provider);
  if (novelAPI.currProvider) {
    data.provider = provider;
    return;
  }
  router.replace("/error");
}

const searchNovel = () => {
  console.log("search");
  searching.value = true;
  novelAPI.searchNovel(query.value).then((res) => {
    if (res) {
      searchResult.value = res;
    }
    searching.value = false;
  });
};
</script>

<template>
  <div>
    <h1>{{ data.provider }}</h1>
    <input
      class="border rounded p-1"
      v-model="query"
      @keypress.enter="searchNovel()"
    />
    <p>Query is: {{ query }}</p>
    <div v-if="searching">Searching</div>
    <div v-for="(res, idx) in searchResult" :key="idx">
      <h1>{{ res.name }}</h1>
      <img :src="res.posterUrl ?? '#'" alt="gambar" />
      <router-link :to="`/novel/${provider}/${res.nameRoute}`"
        >View</router-link
      >
    </div>
  </div>
</template>
