<script lang="ts">
import RightArrowIcon from "./icons/RightArrow.vue";

export default {
  props: {
    title: String,
    description: String,
    imageUrl: String,
    location: String,
    userId: Number,
    tags: Array<String>,
    category: String,
    startDate: Date,
    endDate: Date,
  },
  components: {
    RightArrowIcon
  },
}
</script>
<template>
  <div class="w-72 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
      <img class="rounded-t-lg min-w-72" :src="imageUrl" alt="" />
    </a>
    <div class="p-5">
      <div class="flex flex-row">
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ location }}</p>
        <span id="badge-dismiss-default"
          class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-purple-800 bg-purple-100 rounded dark:bg-purple-900 dark:text-purple-300">{{
            category }}</span>
      </div>
      <br />
      <a href="#">
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{{ title }}</h5>
      </a>

      <div class="h-24">
        <p class="text-ellipsis overflow-hidden line-clamp-4 mb-3 font-normal text-gray-700 dark:text-gray-400">{{
          description }}</p>
      </div><br />
      <p class="text-sm text-gray-500 dark:text-gray-400">{{
        startDate?.getDate() === endDate?.getDate() ? startDate?.toDateString().split(' ')[1] + '' +
          startDate?.toDateString().split(' ')[2] + ', ' + startDate?.toDateString().split(' ')[3] :
          startDate?.getMonth() === endDate?.getMonth() ? startDate?.toDateString().split(' ')[1] + ' ' +
            startDate?.toDateString().split(' ')[2] + ' - ' + endDate?.toDateString().split(' ')[2] + ', ' +
            startDate?.toDateString().split(' ')[3] :
            startDate?.toDateString().split(' ')[1] + ' ' + startDate?.toDateString().split(' ')[2] + ' - ' +
            endDate?.toDateString().split(' ')[1] + ' ' + endDate?.toDateString().split(' ')[2] + ', ' +
            startDate?.toDateString().split(' ')[3]
      }}</p><br />
      <a href="#"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
        Read more
        <RightArrowIcon />
      </a>
    </div>
  </div>
</template>
