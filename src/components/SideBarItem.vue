<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import { useRoute } from "vue-router";

export default defineComponent({
  props: {
    src: { type: String },
    title: { type: String },
    type: { type: String },
  },
  setup(props) {
    const route = useRoute();
    const isActive = computed(() => route.name == props.type);
    console.log(isActive);
    return { isActive };
  },
});
</script>

<template>
  <router-link :to="{ name: type }">
    <div
      class="relative flex items-center justify-center h-12 w-12 my-2 mr-2 group"
    >
      <div
        class="active-link"
        :class="{ active: isActive, inactive: !isActive }"
      ></div>
      <img v-bind:src="src" class="sidebar-icon" v-bind:title="title" />
      <!-- <div class="sidebar-tooltip group-hover:scale-100">{{ title }}</div> -->
    </div>
  </router-link>
</template>

<style scoped>
.active-link {
  float: left;
  padding-right: 0.4rem;
  margin-right: 0.1rem;
  background-color: white;
  border-radius: 0 25px 25px 0;
}
.active {
  height: 90%;
}
.inactive {
  height: 10%;
}
</style>
