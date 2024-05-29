<script setup lang="ts">
import { onMounted } from "vue";
import { initFlowbite, initDropdowns } from "flowbite";

onMounted(() => {
  initFlowbite();
  initDropdowns();
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
