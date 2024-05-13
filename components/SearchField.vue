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
      tagsList: [] as string[],
      tags: "",
    }
  },
  components: {
    EventIcon,
    SearchIcon,
    FilterIcon,
    CloseIcon,
    DateIcon
  },
  methods: {
    addTag() {
      const newTags = this.tags.split(",");
      this.tagsList.push(...newTags);
      this.tags = ""
    },
    removeTag(tag: string) {
      this.tagsList = this.tagsList.filter((t) => t !== tag);
    }
  }
}
</script>

<template>
  <form class="flex items-center max-w-xl mx-auto">
    <button data-modal-target="default-modal" data-modal-toggle="default-modal" type="button"
      class="text-gray bg-gray-50 border hover:border-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
      <FilterIcon /> Filters
    </button>

    <label for="simple-search" class="sr-only">Search</label>
    <div class="relative w-full">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <EventIcon />
      </div>
      <input type="text" id="simple-search"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
        placeholder="Search event title..." required />
    </div>

    <button type="submit"
      class="p-2.5 ms-2 text-sm font-medium text-white bg-purple-700 rounded-lg border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
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
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500">
                  <option selected>Choose a location</option>
                  <option value="Addis Ababa">Addis Ababa</option>
                  <option value="Adama">Adama</option>
                  <option value="Hawassa">Hawassa</option>
                  <option value="Bahridar">Bahridar</option>
                </select><br />

                <label for="categories"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                <select id="categories"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500">
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
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enterance
                    fee
                    ({{
                      enteranceFee
                    }} ETB)</label>
                  <input id="labels-range-input" type="range" v-model="enteranceFee" min="0" max="1500"
                    class="w-full h-2 bg-purple-200 rounded-lg accent-purple-800 appearance-none cursor-pointer dark:bg-gray-700 [&::-webkit-slider-thumb]:!bg-purple-800">
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

                <div class="flex flex-row w-full">
                  <div class="w-full mr-8">
                    <label for="date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start
                      date</label>
                    <input id="date" type="date"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                      placeholder="Select date">
                  </div>
                  <div class="w-full">
                    <label for="date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End
                      date</label>
                    <input id="date" type="date"
                      class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                      placeholder="Select date">
                  </div>
                </div><br />
                <div>
                  <label for="tags" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tags</label>
                  <div class="flex flex-row w-full">
                    <div class="mr-4">
                      <input type="text" name="tags" id="tags" v-model="tags"
                        class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="#tech, #meetup" />
                    </div>
                    <div>
                      <button type="button" @click="addTag"
                        class="w-32 text-white bg-purple-700 hover:border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Add</button>
                    </div>
                  </div><br />
                  <div class="grid-cols-4 gap-4">
                    <span id="badge-dismiss-default" v-for="tag in tagsList" :key="tag"
                      class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-purple-800 bg-purple-100 rounded dark:bg-purple-900 dark:text-purple-300">{{
                        tag }}
                      <button type="button"
                        class="inline-flex items-center p-1 ms-2 text-sm text-purple-400 bg-transparent rounded-sm hover:bg-purple-200 hover:text-purple-900 dark:hover:bg-purple-800 dark:hover:text-purple-300"
                        data-dismiss-target="#badge-dismiss-default" aria-label="Remove"
                        @click="(() => removeTag(tag))">
                        <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                          viewBox="0 0 14 14">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Remove badge</span>
                      </button>
                    </span>
                  </div>
                </div>
              </form>
            </client-only>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
