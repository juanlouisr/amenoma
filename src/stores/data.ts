import { defineStore } from "pinia";

export const useDataStore = defineStore({
  id: "data",
  state: () => ({
    type: "?",
    provider: "?",
    name: "?",
    currentChapter: "?",
  }),
  //   getters: {
  //     doubleCount: (state) => state.counter * 2,
  //   },
  //   actions: {
  //     set(data: string) {
  //       this.type = data;
  //     },
  //   },
});
