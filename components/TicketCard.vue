<script lang="ts">
    import RemoveIcon from "./icons/Remove.vue";
    export default {
      props: {
        name: String,
        description: String,
        price: Number,
        remove: Function
      },
      components: {
        RemoveIcon
      } 
    }
</script>

<template>
    <div class="flex flex-row items-start w-64 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div class="p-5">
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{{ name }}</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ description }}</p>
        <span v-if="price === 0" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300">FREE</span>
        <p v-else class="text-sm text-gray-500 dark:text-gray-400">{{ price }} ETB</p>
      </div>
      <button type="button" class="inline-flex items-center p-2 ms-2 text-sm text-purple-400 bg-transparent rounded-sm hover:bg-purple-200 hover:text-purple-900 dark:hover:bg-purple-800 dark:hover:text-purple-300" data-dismiss-target="#badge-dismiss-default" aria-label="Remove" @click="(() => remove!(name))">
        <RemoveIcon />
        <span class="sr-only">Remove badge</span>
      </button>
    </div>
</template>