<script lang="ts">
import LoadingIcon from "./icons/Loading.vue";

export default {
  components: {
    LoadingIcon
  }
}
</script>
<template>
  <div class="flex flex-col mt-100 justify-center items-center text-center">
    <div role="status">
      <LoadingIcon />
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>
