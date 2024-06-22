<script setup lang="ts">
import { onMounted } from "vue";
import { initFlowbite, initDropdowns, initModals } from "flowbite";

onMounted(() => {
  initFlowbite();
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
