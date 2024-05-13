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
      <p class="text-sm text-gray-500 dark:text-gray-400">{{ location }}</p><br />
      <a href="#">
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{{ title }}</h5>
      </a>
      <div class="h-24">
        <p class="text-ellipsis overflow-hidden line-clamp-4 mb-3 font-normal text-gray-700 dark:text-gray-400">{{ description }}</p>
      </div><br/>
      <p class="text-sm text-gray-500 dark:text-gray-400">{{ 
        startDate?.getDate() === endDate?.getDate() ? startDate?.toDateString().split(' ')[1] + '' + startDate?.toDateString().split(' ')[2] + ', ' + startDate?.toDateString().split(' ')[3]:
          startDate?.getMonth() === endDate?.getMonth() ? startDate?.toDateString().split(' ')[1] + ' ' + startDate?.toDateString().split(' ')[2] + ' - ' + endDate?.toDateString().split(' ')[2] + ', ' + startDate?.toDateString().split(' ')[3]:
          startDate?.toDateString().split(' ')[1] + ' ' + startDate?.toDateString().split(' ')[2] + ' - ' + endDate?.toDateString().split(' ')[1] + ' ' + endDate?.toDateString().split(' ')[2] + ', ' + startDate?.toDateString().split(' ')[3]
      }}</p><br />
      <a href="#"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Read more
        <RightArrowIcon />
      </a>
    </div>
  </div>
</template>
