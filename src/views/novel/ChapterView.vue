<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ref, watch, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNovelStore } from "@/stores/novel";
import { useDataStore } from "@/stores/data";
import type { LoadResponse } from "@/models/main.model";

import LoadPage from "@/components/LoadPage.vue";

const loaded = ref(false);
const data = useDataStore();
const novelAPI = useNovelStore();
const route = useRoute();
const router = useRouter();

const provider = route.params.provider as string;
const name = route.params.name as string;
const root = ref<HTMLElement | null>(null);
onBeforeMount(async () => {
  data.type = "novel";
  loaded.value = false;
  loadProvider();
  await loadNovel();
  await loadChapter(data.currNovel!, Number(route.params.chapter));
});

watch(
  () => route.params.chapter,
  async (newId, oldId) => {
    loaded.value = false;
    const nextIdx = Number(newId) - 1;
    const oldIdx = Number(oldId) - 1;
    if (nextIdx - 1 === oldIdx) {
      if (data.nextContent) {
        data.currentContent = data.nextContent;
        data.currentIdx++;
        loaded.value = true;
        data.nextContent = "";
        root.value?.scrollIntoView();
        if (
          nextIdx + 1 !== data.currNovel?.data.length &&
          data.currNovel?.data[nextIdx + 1].url
        ) {
          data.nextContent =
            (await novelAPI.getChapter(
              data.currNovel?.data[nextIdx + 1].url
            )) ?? "";
        }
        return;
      }
    }
    loadChapter(data.currNovel!, nextIdx + 1);
  }
);

function loadProvider() {
  novelAPI.updateProvider(provider);
  if (novelAPI.currProvider) {
    data.provider = provider;
    return;
  }
  router.replace("/error");
}

async function loadNovel() {
  if (
    data.nameRoute &&
    data.nameRoute === name &&
    data.currentIdx === Number(route.params.chapter) - 1
  ) {
    loaded.value = true;
  }
  data.currNovel = await novelAPI.getNovelFromName(name);
  if (data.currNovel) {
    data.nameRoute = name;
    data.name = data.currNovel.name;
    return;
  }
  router.replace("/error");
}

async function loadChapter(
  novel: LoadResponse,
  chapter: number
): Promise<void> {
  if (chapter && chapter <= novel.data.length && chapter > 0) {
    if (data.currentIdx !== chapter - 1) {
      const val = await novelAPI.getChapter(novel.data[chapter - 1].url);
      if (!val) {
        return;
      }
      data.currentContent = val;
      data.nextContent = "";
    }
    data.currentIdx = chapter - 1;
    loaded.value = true;
    if (chapter < novel.data.length) {
      data.nextContent =
        (await novelAPI.getChapter(novel.data[chapter].url)) ?? "";
    }
    return;
  }
  router.replace(`/novel/${provider}/${name}`);
}
</script>

<template>
  <div>
    <div v-if="!loaded"><LoadPage /></div>
    <div v-else ref="root" v-html="data.currentContent"></div>
  </div>
</template>
