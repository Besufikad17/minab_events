<script lang="ts">
import { getDateTime } from "../utils/helpers/data";
import RightArrowIcon from "./icons/RightArrow.vue";

export default {
  props: {
    id: Number,
    title: String,
    description: String,
    imageUrl: String,
    location: String,
    category: String,
    startDate: Date,
    endDate: Date,
  },
  data() {
    return {
      fullDate: getDateTime(this.startDate!, this.endDate!)
    }
  },
  components: {
    RightArrowIcon
  },
}
</script>
<template>
  <div class="w-72 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a :href="imageUrl" target="_blank">
      <img class="rounded-t-lg min-w-72" :src="imageUrl" alt="" />
    </a>
    <div class="p-5">
      <div class="flex flex-row space-x-4">
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ location }}</p>
        <span id="badge-dismiss-default"
          class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-purple-800 bg-purple-100 rounded dark:bg-purple-900 dark:text-purple-300">{{
            category }}</span>
      </div>
      <br />
      <a :href="'/events/' + id">
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{{ title }}</h5>
      </a>

      <p class="text-sm text-gray-500 dark:text-gray-400">{{ fullDate }}</p><br />
      <a :href="'/events/' + id"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
        Read more
        <RightArrowIcon />
      </a>
    </div>
  </div>
</template>
