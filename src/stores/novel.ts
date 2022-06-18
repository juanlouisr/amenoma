import type { MainAPI } from "@/models/novelAPI";
import { AzyNovelProvider } from "@/providers/azyNovel.provider";
import { defineStore } from "pinia";

export const useNovelStore = defineStore({
  id: "novelProvider",
  state: () => ({
    providers: [new AzyNovelProvider()] as MainAPI[],
  }),
  getters: {
    getProviderByName: (state) => {
      return (name: string) =>
        state.providers.find((provider) => provider.name === name);
    },
  },
});
