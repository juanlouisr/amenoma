import { createRouter, createWebHistory } from "vue-router";
import AboutView from "../views/AboutView.vue";
import AnimeView from "../views/AnimeView.vue";
import NovelView from "../views/NovelView.vue";
import MangaView from "../views/MangaView.vue";

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
      path: "/manga",
      name: "manga",
      component: MangaView,
    },
  ],
});

export default router;
