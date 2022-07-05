import type { BookmarkData } from "@/models/main.model";
import { defineStore } from "pinia";
import { useDataStore } from "./data";
import { IDBStorage } from "./idbStorage";

export const useBookmarkStore = defineStore({
  id: "data",
  state: () => ({
    bookmark: [] as BookmarkData[],
  }),
  actions: {
    insertBookMark() {
      const data = useDataStore();
      this.bookmark.push(data.copyState);
      this.bookmark.push(data);
    },
    findBookmark(data: BookmarkData): BookmarkData | undefined {
      return this.bookmark.find(
        (bm) =>
          bm.type === data.type &&
          bm.provider === data.provider &&
          bm.nameRoute === data.nameRoute
      );
    },
  },
  persist: {
    storage: IDBStorage,
  },
});
