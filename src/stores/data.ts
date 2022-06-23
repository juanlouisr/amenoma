import type { ChapterData } from "@/models/main.model";
import { defineStore } from "pinia";

export const useDataStore = defineStore({
  id: "data",
  state: () => ({
    type: "",
    provider: "",
    name: "",
    nameRoute: "",
    currentIdx: 0,
    nextContent: "",
    chaperList: [] as ChapterData[],
  }),
  getters: {
    getRouteName: (state) => {
      return `/${state.type}/${state.provider}/${state.nameRoute}`;
    },
    getRouteChapter: (state) => {
      return `/${state.type}/${state.provider}/${state.nameRoute}/${state.currentIdx}`;
    },
  },
  actions: {
    reset() {
      this.$reset;
    },
  },
});
