<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ref, watch, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNovelStore } from "@/stores/novel";
import { useDataStore } from "@/stores/data";
import type { LoadResponse } from "@/models/main.model";

const loaded = ref(false);
const content = ref("loading");
const data = useDataStore();
const novelAPI = useNovelStore();
const route = useRoute();
const router = useRouter();

const provider = route.params.provider as string;
const name = route.params.name as string;

onBeforeMount(async () => {
  data.type = "novel";
  loaded.value = false;
  loadProvider();
  await loadNovel();
  await loadChapter(novelAPI.currNovel!, Number(route.params.chapter));
});

watch(
  () => route.params.chapter,
  async (newId, oldId) => {
    loaded.value = false;
    const nextIdx = Number(newId) - 1;
    const oldIdx = Number(oldId) - 1;
    if (nextIdx - 1 === oldIdx) {
      if (data.nextContent) {
        content.value = data.nextContent;
        data.currentIdx++;
        loaded.value = true;
        data.nextContent = "";
        data.nextContent =
          (await novelAPI.getChapter(data.chaperList[nextIdx + 1].url)) ?? "";
        return;
      }
    }
    loadChapter(novelAPI.currNovel!, nextIdx + 1);
  }
);

function loadProvider() {
  novelAPI.updateProvider(provider);
  if (!novelAPI.currProvider) {
    router.push("/error");
    return;
  }
  data.provider = provider;
}

async function loadNovel() {
  if (data.name && novelAPI.currNovel?.name === data.name) {
    return;
  }
  await novelAPI.loadNovelFromName(name);
  if (!novelAPI.currNovel) {
    router.push("/error");
    return;
  }
  data.namedUrl = name;
  data.name = novelAPI.currNovel.name;
}

async function loadChapter(
  novel: LoadResponse,
  chapter: number
): Promise<void> {
  if (chapter < 1 || chapter - 1 > novel.data.length) {
    router.push(`/novel/${provider}/${name}`);
    return;
  }
  const val = await novelAPI.getChapter(novel.data[chapter - 1].url);
  if (!val) {
    router.push(`/novel/${provider}/${name}`);
    return;
  }
  content.value = val;
  data.currentIdx = chapter - 1;
  data.chaperList = novel.data;
  loaded.value = true;
  data.nextContent = "";
  data.nextContent = (await novelAPI.getChapter(novel.data[chapter].url)) ?? "";
}
</script>

<template>
  <div>
    <div v-if="!loaded">Content Loading</div>
    <div v-else v-html="content"></div>
  </div>
</template>
