<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNovelStore } from "@/stores/novel";
import { useDataStore } from "@/stores/data";
import type { SearchResponse } from "@/models/main.model";
import SearchBar from "../../components/SearchBar.vue";
import NovelCard from "../../components/NovelCard.vue";

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
  searching.value = true;
  novelAPI.searchNovel(query.value).then((res) => {
    if (res) {
      searchResult.value = res;
    }
    searching.value = false;
  });
};

const inputEvent = (event: Event) => {
  query.value = (event.target as HTMLInputElement).value;
};
</script>

<template>
  <div class="home flex flex-col">
    <h1 class="title my-3">{{ data.provider }}</h1>

    <SearchBar
      :submit="searchNovel"
      :searching="searching"
      :query="query"
      :input="inputEvent"
    />

    <div
      v-if="searchResult.length"
      class="w-[97%] p-2 bg-gray-800 flex flex-wrap my-4 mx-auto py-4 gap-y-5 gap-x-5 justify-center rounded-md justify-items-center"
    >
      <div v-for="(res, idx) in searchResult" :key="idx">
        <NovelCard
          :link="`/novel/${provider}/${res.nameRoute}`"
          :rating="res.rating"
          :name="res.name"
          :posterurl="res.posterUrl"
          :latest-chapter="res.latestChapter"
        />
      </div>
    </div>

    <div class="homepage"></div>
  </div>
</template>
