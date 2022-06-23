import type { MainAPI } from "@/models/novelAPI";
import { AzyNovelProvider } from "@/providers/azyNovel.provider";
import { defineStore } from "pinia";

export const useNovelStore = defineStore({
  id: "novelProvider",
  state: () => ({
    providers: [new AzyNovelProvider()] as MainAPI[],
    currProvider: null as MainAPI | null | undefined,
  }),
  getters: {
    getProviderByName: (state) => {
      return (name: string) =>
        state.providers.find((provider) => provider.name === name);
    },
  },
  actions: {
    updateProvider(name: string) {
      this.currProvider = this.getProviderByName(name);
    },
    async loadNovel(url: string) {
      return await this.currProvider?.load(url);
    },
    async searchNovel(query: string) {
      return this.currProvider?.search(query);
    },
    async getNovelFromName(name: string) {
      return await this.currProvider?.loadFromName(name);
    },
    async getChapter(url: string) {
      return this.currProvider?.loadContent(url);
    },
  },
});
