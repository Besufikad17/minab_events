<script lang="ts">
import EventIcon from "./icons/Event.vue";
import SearchIcon from "./icons/Search.vue";
import FilterIcon from "./icons/Filter.vue";
import CloseIcon from "./icons/Close.vue";
import DateIcon from "./icons/Date.vue";

export default {
  data() {
    return {
      enteranceFee: 0,
    }
  },
  head: {
    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/datepicker.min.js'
      }
    ]
  },
  components: {
    EventIcon,
    SearchIcon,
    FilterIcon,
    CloseIcon,
    DateIcon
  }
}
</script>

<template>
  <form class="flex items-center max-w-xl mx-auto">
    <button data-modal-target="default-modal" data-modal-toggle="default-modal" type="button"
      class="text-gray bg-gray-50 border hover:border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      <FilterIcon /> Filters
    </button>

    <label for="simple-search" class="sr-only">Search</label>
    <div class="relative w-full">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <EventIcon />
      </div>
      <input type="text" id="simple-search"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search event title..." required />
    </div>

    <button type="submit"
      class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      <SearchIcon />
      <span class="sr-only">Search</span>
    </button>

    <!-- Main modal -->
    <div id="default-modal" tabindex="-1" aria-hidden="true"
      class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Filters
            </h3>
            <button type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal">
              <CloseIcon />
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-4 md:p-5 space-y-4">
            <client-only>
              <form class="max-w-sm mx-auto">
                <label for="locations"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                <select id="locations"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Choose a location</option>
                  <option value="Addis Ababa">Addis Ababa</option>
                  <option value="Adama">Adama</option>
                  <option value="Hawassa">Hawassa</option>
                  <option value="Bahridar">Bahridar</option>
                </select><br />

                <label for="categories"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                <select id="categories"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Choose a category</option>
                  <option value="1">Concerts</option>
                  <option value="2">Classes and Workshops</option>
                  <option value="3">Festivals and Fairs</option>
                  <option value="4">Conferences</option>
                  <option value="5">Corporate Events</option>
                  <option value="6">Online Events</option>
                </select><br />

                <div class="relative mb-6">
                  <label for="labels-range-input"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enterance fee ({{ enteranceFee
                    }} ETB)</label>
                  <input id="labels-range-input" type="range" v-model="enteranceFee" min="0" max="1500"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
                  <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">0 ETB</span>
                  <span
                    class="text-sm text-gray-500 dark:text-gray-400 absolute start-1/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">500
                    ETB</span>
                  <span
                    class="text-sm text-gray-500 dark:text-gray-400 absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">750
                    ETB</span>
                  <span
                    class="text-sm text-gray-500 dark:text-gray-400 absolute start-2/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">1000
                    ETB</span>
                  <span class="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">1500 ETB</span>
                </div><br />

                <div class="relative max-w-sm">
                  <label for="date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Due
                    date</label>
                  <input id="date" type="date"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date">
                </div><br />
              </form>
            </client-only>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
