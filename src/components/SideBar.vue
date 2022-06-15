<script setup lang="ts">
import SideBarItem from "./SideBarItem.vue";
</script>

<template>
  <div
    class="sticky overflow-y-scroll h-screen min-w-max w-16 flex flex-col bg-gray-900 text-white shadow-lg no-scrollbar"
  >
    <SideBarItem
      src="https://uxwing.com/wp-content/themes/uxwing/download/44-hand-gestures/good.png"
      title="menarik"
      type="about"
    />
    <hr class="sidebar-hr" />
    <SideBarItem
      src="https://toolboxpayment.com/wp-content/uploads/2021/06/facebook-600.png"
      title="facebook"
      type="anime"
    />
    <SideBarItem
      src="https://static.vecteezy.com/system/resources/previews/004/263/114/original/meta-logo-meta-by-facebook-icon-editorial-logo-for-social-media-free-vector.jpg"
      title="Meta"
      type="novel"
    />
    <SideBarItem
      src="https://uxwing.com/wp-content/themes/uxwing/download/44-hand-gestures/good.png"
      title="menarik"
      type="manga"
    />
  </div>
</template>
