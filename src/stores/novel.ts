import type { LoadResponse } from "@/models/main.model";
import type { MainAPI } from "@/models/novelAPI";
import { AzyNovelProvider } from "@/providers/azyNovel.provider";
import { defineStore } from "pinia";

export const useNovelStore = defineStore({
  id: "novelProvider",
  state: () => ({
    providers: [new AzyNovelProvider()] as MainAPI[],
    currProvider: null as MainAPI | null | undefined,
    currNovel: null as LoadResponse | null | undefined,
  }),
  getters: {
    getProviderByName: (state) => {
      return (name: string) =>
        state.providers.find((provider) => provider.name === name);
    },
    getCurrentNovelUrl: (state) => {
      return state.currNovel?.url;
    },
  },
  actions: {
    updateProvider(name: string) {
      this.currProvider = this.getProviderByName(name);
    },
    findNextUrl(url: string) {
      const currIdx = this.currNovel?.data.findIndex(
        (data) => data.url === url
      );
      if (currIdx) {
        return this.currNovel?.data[currIdx + 1];
      }
    },
    getNextUrl(idx: number) {
      return this.currNovel?.data[idx + 1].url;
    },
    async loadNovel(url: string) {
      this.currNovel = await this.currProvider?.load(url);
    },
    async searchNovel(query: string) {
      return this.currProvider?.search(query);
    },
    async loadNovelFromName(name: string) {
      this.currNovel = await this.currProvider?.loadFromName(name);
    },
    async getChapter(url: string) {
      return this.currProvider?.loadContent(url);
    },
  },
});
