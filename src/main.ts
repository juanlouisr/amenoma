import { createApp } from "vue";
import { createPinia } from "pinia";
import { get } from "idb-keyval";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";
import "./index.css";

const app = createApp(App);

const pinia = createPinia();
const data = get("data");
const bookmark = get("bookmark");

data.then((dataStore) => {
  if (dataStore) {
    pinia.state.value.data = JSON.parse(dataStore);
  }
});

bookmark.then((bookmarkStore) => {
  if (bookmarkStore) {
    pinia.state.value.bookmark = JSON.parse(bookmarkStore);
  }
});

pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);

app.mount("#app");
