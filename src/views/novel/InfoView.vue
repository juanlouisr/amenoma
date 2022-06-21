<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNovelStore } from "@/stores/novel";
import { useDataStore } from "@/stores/data";

const loaded = ref(false);
const data = useDataStore();
const novelAPI = useNovelStore();
const route = useRoute();
const router = useRouter();

const provider = route.params.provider as string;
const name = route.params.name as string;

onBeforeMount(async () => {
  data.type = "novel";
  loadProvider();
  await loadNovel();
  if (novelAPI.currNovel) {
    loaded.value = true;
  }
});

function loadProvider() {
  novelAPI.updateProvider(provider);
  if (novelAPI.currProvider) {
    data.provider = provider;
  } else {
    router.push("/error");
    return;
  }
}
async function loadNovel() {
  if (data.name && novelAPI.currNovel?.name === data.name) {
    return;
  }
  await novelAPI.loadNovelFromName(name);
  if (novelAPI.currNovel) {
    data.namedUrl = name;
    data.name = novelAPI.currNovel.name;
    data.chaperList = novelAPI.currNovel.data;
    return;
  }
  router.replace("/error");
}
</script>

<template>
  <div>
    <div v-if="!loaded">Content Loading</div>
    <div v-else>{{ novelAPI.currNovel?.name }}</div>
  </div>
</template>
