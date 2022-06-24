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

const truncate = (text: string, stop: number) => {
  return text.slice(0, stop) + (stop < text.length ? "..." : "");
};
</script>

<template>
  <div class="home flex flex-col">
    <h1 class="title my-3">{{ data.provider }}</h1>
    <div class="searchbar w-full md:w-2/3 mx-auto flex relative mb-1 h-11">
      <div
        v-if="searching"
        class="loading absolute left-2 top-1.5 animate-spin h-7 w-7"
      >
        <img src="../../assets/loading.png" alt="loading" class="object-fit" />
      </div>
      <img
        v-else
        src="../../assets/search.png"
        alt="search"
        class="absolute left-2 top-1.5 h-4/6"
      />
      <input
        class="rounded-2xl flex-grow text-2xl overflow-x-hidden"
        :value="query"
        @input="inputEvent($event)"
        @keypress.enter="searchNovel()"
        autofocus
      />
    </div>
    <div
      v-if="searchResult.length != 0"
      class="result grid xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-3 grid-flow-col-3 sm:grid-cols-1 my-3 mx-auto py-4 gap-y-5 justify-center rounded-md justify-items-center"
    >
      <div v-for="(res, idx) in searchResult" :key="idx">
        <router-link :to="`/novel/${provider}/${res.nameRoute}`">
          <div class="res-card h-64 w-40 flex flex-col relative rounded-md">
            <div
              class="rating flex flex-row w-4/12 absolute"
              v-if="res.rating ?? false"
            >
              <h1 class="rating-score ml-3 mr-0.5">
                {{ res.rating?.toString }}
              </h1>
              <img
                src="../../assets/star.png"
                alt="star"
                class="h-3/5 my-auto"
              />
            </div>
            <img
              :src="res.posterUrl ?? '#'"
              alt="poster"
              class="h-4/6 w-full object-fill rounded-top-md"
            />
            <h1 class="text-sm p-1">{{ truncate(res.name, 32) }}</h1>
            <h3
              class="text-xs px-1 absolute bottom-3"
              v-if="res.latestChapter ?? false"
            >
              Chapter {{ res.latestChapter }}
            </h3>
          </div>
        </router-link>
      </div>
    </div>
    <div class="homepage"></div>
  </div>
</template>

<style scoped>
.home {
  background-color: #36393f;
}

.title {
  margin-left: auto;
  margin-right: auto;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
}

input {
  background-color: #b9bbbe;
  padding: 0.25rem 3rem 0.25rem 3rem;
}

.rounded-top-md {
  border-radius: 0.375rem 0.375rem 0 0;
}

.result {
  width: 95%;
  background-color: #2f3136;
}

.res-card {
  background-color: #202225;
}

.rating {
  background-color: rgba(32, 34, 37, 0.88);
}

h1,
h3 {
  color: white;
}
</style>
