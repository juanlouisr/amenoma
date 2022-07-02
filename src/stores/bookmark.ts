import type { BookmarkData } from "@/models/main.model";
import { defineStore } from "pinia";
import { IDBStorage } from "./idbStorage";
import { parse, stringify } from "flatted";

export const useBookmarkStore = defineStore({
  id: "bookmark",
  state: () => ({
    bookmark: [] as BookmarkData[],
    // bookmark: new Map<string, BookmarkData>(),
  }),
  actions: {
    insertBookmark(val: BookmarkData) {
      this.bookmark.push(val);
    },
    deleteBookmark(key: string) {
      this.bookmark = this.bookmark.filter(
        (bm) => getBookmarkRoute(bm) !== key
      );
    },
    getBookmark(key: string) {
      return this.bookmark.find((bm) => getBookmarkRoute(bm) === key);
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

export function getBookmarkRoute(data: BookmarkData) {
  return `/${data.type}/${data.provider}/${data.nameRoute}`;
}
