import type { BookmarkData, LoadResponse } from "@/models/main.model";
import { defineStore } from "pinia";
import { IDBStorage } from "./idbStorage";
import { parse, stringify } from "flatted";

export const useDataStore = defineStore({
  id: "data",
  state: () => ({
    type: "",
    provider: "",
    name: "",
    nameRoute: "",
    currentIdx: -1,
    currentContent: "",
    nextContent: "",
    currNovel: null as LoadResponse | null | undefined,
  }),
  getters: {
    copyState: (state): BookmarkData => {
      return {
        type: state.type,
        provider: state.provider,
        name: state.name,
        nameRoute: state.nameRoute,
        currentIdx: state.currentIdx,
        currentContent: state.currentContent,
        nextContent: state.nextContent,
        currNovel: state.currNovel,
      };
    },
    getRouteName: (state) => {
      return `/${state.type}/${state.provider}/${state.nameRoute}`;
    },
    getRouteChapter: (state) => {
      return `/${state.type}/${state.provider}/${state.nameRoute}/${state.currentIdx}`;
    },
    getRouteNextChapter: (state) => {
      return `/${state.type}/${state.provider}/${state.nameRoute}/${
        state.currentIdx + 2
      }`;
    },
    getRoutePrevChapter: (state) => {
      return `/${state.type}/${state.provider}/${state.nameRoute}/${state.currentIdx}`;
    },
  },
  actions: {
    reset() {
      this.$reset;
    },
  },
  persist: {
    storage: IDBStorage,
    serializer: {
      serialize: stringify,
      deserialize: parse,
    },
  },
});
