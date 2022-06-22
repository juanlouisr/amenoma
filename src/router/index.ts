import { createRouter, createWebHistory } from "vue-router";
import AboutView from "@/views/AboutView.vue";
import AnimeView from "@/views/anime/AnimeView.vue";
import NovelView from "@/views/novel/NovelView.vue";
import NovelHomeView from "@/views/novel/HomeView.vue";
import NovelInfoView from "@/views/novel/InfoView.vue";
import NovelChapterView from "@/views/novel/ChapterView.vue";
import MangaView from "@/views/manga/MangaView.vue";
import ErrorView from "@/views/ErrorView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "about",
      component: AboutView,
    },
    {
      path: "/anime",
      name: "anime",
      component: AnimeView,
    },
    {
      path: "/novel",
      name: "novel",
      component: NovelView,
    },
    {
      path: "/novel/:provider",
      name: "novelHome",
      component: NovelHomeView,
    },
    {
      path: "/novel/:provider/:name/",
      name: "novelInfo",
      component: NovelInfoView,
    },
    {
      path: "/novel/:provider/:name/:chapter",
      name: "novelChapter",
      component: NovelChapterView,
    },
    {
      path: "/manga",
      name: "manga",
      component: MangaView,
    },
    {
      path: "/:notFound(.*)",
      name: "error",
      component: ErrorView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

export default router;
