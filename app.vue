<script setup lang="ts">
import { onMounted } from "vue";
import { initFlowbite, initDropdowns, initModals, initCarousels } from "flowbite";

onMounted(() => {
  initFlowbite();
  initCarousels();
  initDropdowns();
  initModals();
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
