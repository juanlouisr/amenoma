<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNovelStore } from "@/stores/novel";
import { useDataStore } from "@/stores/data";
import LoadPage from "@/components/LoadPage.vue";

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
  if (data.currNovel) {
    loaded.value = true;
  }
});

function loadProvider() {
  novelAPI.updateProvider(provider);
  if (novelAPI.currProvider) {
    data.provider = provider;
    return;
  }
  router.replace("/error");
}

async function loadNovel() {
  if (data.nameRoute && data.nameRoute === name) {
    return;
  }
  data.currNovel = await novelAPI.getNovelFromName(name);
  if (data.currNovel) {
    data.nameRoute = name;
    data.name = data.currNovel.name;
    data.currentIdx = -1;
    return;
  }
  router.replace("/error");
}
</script>

<template>
  <div v-if="!loaded"><LoadPage /></div>
  <div v-else>{{ data.currNovel?.name }}</div>
</template>
