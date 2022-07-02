<script setup lang="ts">
import { ref, onBeforeMount, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNovelStore } from "@/stores/novel";
import { useDataStore } from "@/stores/data";
import LoadPage from "@/components/LoadPage.vue";
import { useBookmarkStore } from "@/stores/bookmark";

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

watch(
  () => route.params.name,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_newName, _oldName) => {
    loaded.value = false;
    const bmS = useBookmarkStore();
    const bm = bmS.getBookmark(route.path);
    if (bm) {
      data.type = bm.type;
      data.provider = bm.provider;
      data.name = bm.name;
      data.nameRoute = bm.nameRoute;
      data.currentIdx = bm.currentIdx;
      data.currentContent = bm.currentContent;
      data.nextContent = bm.nextContent;
      data.currNovel = bm.currNovel;
    }
    loaded.value = true;
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
  if (data.nameRoute && data.nameRoute === name) {
    return;
  }
  const bmS = useBookmarkStore();
  const bm = bmS.getBookmark(route.path);
  if (bm) {
    data.type = bm.type;
    data.provider = bm.provider;
    data.name = bm.name;
    data.nameRoute = bm.nameRoute;
    data.currentIdx = bm.currentIdx;
    data.currentContent = bm.currentContent;
    data.nextContent = bm.nextContent;
    data.currNovel = bm.currNovel;
  } else {
    data.currNovel = await novelAPI.getNovelFromName(name);
    if (data.currNovel) {
      data.nameRoute = name;
      data.name = data.currNovel.name;
      data.currentIdx = -1;
      return;
    }
  }
  router.replace("/error");
}
</script>

<template>
  <div v-if="!loaded"><LoadPage /></div>
  <div v-else>{{ data.currNovel?.name }}</div>
</template>
