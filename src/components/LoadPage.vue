<template>
  <div class="relative z-50 w-full cover flex">
    <div class="h-14 w-14 animate-spin m-auto">
      <img
        src="../assets/loading.png"
        alt="loading.."
        class="object-scale-down"
      />
    </div>
  </div>
</template>

<style scoped>
.cover {
  height: calc(100vh - 4rem);
  background-color: rgba(0, 0, 0, 0.249);
}
</style>
