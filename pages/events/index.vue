<script setup lang="ts">
import EventIcon from "../../components/icons/Event.vue";
import SearchIcon from "../../components/icons/Search.vue";
import FilterIcon from "../../components/icons/Filter.vue";
import CloseIcon from "../../components/icons/Close.vue";
import DateIcon from "../../components/icons/Date.vue";
import LoadingIcon from "../../components/icons/Loading.vue";
import { getLocationsQuery } from "../../utils/constants/queries/locations";
import { searchEventQuery, searchEventQueryWithTags } from "../../utils/constants/queries/events";
import type { EventResponse, Events } from "../../types/event";
import type { Location, LocationResponse } from "../../types/location";

defineComponent({
  components: {
    EventIcon,
    SearchIcon,
    FilterIcon,
    CloseIcon,
    DateIcon,
    LoadingIcon
  }
});

const route = useRoute();
const isLoading = ref(false);
const events = ref<EventResponse[]>([]);
const totalEvents = ref(0);
const currentPage = ref(1);
const skip = ref(route.query.skip ? parseInt(route.query.skip as string) : 0);
const take = ref(6);
const min = ref(0);
const max = ref(10000);
const minPrice = ref(route.query.min ? parseInt(route.query.min as string) : 0);
const maxPrice = ref(route.query.max ? parseInt(route.query.max as string) : 1000);
const minThumb = ref(0);
const maxThumb = ref(0);
const locations = ref<string[]>([]);
const text = ref(route.query.text ? route.query.text as string : "");
const city = ref(route.query.city ? route.query.city as string : "");
const category = ref(route.query.category ? route.query.category as string : "");
const tags = ref("");
const tagsList = ref<string[]>([]);

const minTrigger = () => {   
  minThumb.value = Math.min(minPrice.value, maxPrice.value - 500);      
  minThumb.value = ((minPrice.value - min.value) / (max.value - min.value)) * 100;
}
           
const maxTrigger = () => {
  maxThumb.value = Math.max(maxPrice.value, minPrice.value + 500); 
  maxThumb.value = 100 - (((maxPrice.value - min.value) / (max.value - min.value)) * 100);    
} 

const addTag = () => {
  const newTags = tags.value.split(",");
  tagsList.value.push(...newTags);
  tags.value = ""
}

const removeTag = (tag: string) => {
  tagsList.value = tagsList.value.filter((t) => t !== tag);
}

const variables = {
  text: `%${text.value}%`,
  city: `%${city.value}%`,
  category: `%${category.value}%`,
  min_enterance_fee: minPrice.value,
  max_enterance_fee: maxPrice.value,
  tags: tagsList.value,
  skip: skip.value,
  take: take.value
};

isLoading.value = true;
const { data } = await useAsyncQuery<Events>(searchEventQuery, variables);
if(data.value?.events) {
  events.value = data.value.events;
  totalEvents.value = data.value.events_aggregate.aggregate.count;
}else {
  console.log('No events found');
}
const { data: result } = await useAsyncQuery<LocationResponse>(getLocationsQuery);
if(result.value) {
  let queryResult = result.value?.locations.map((location: Location) => location.city);
  locations.value = queryResult.filter((item: string, index: number) => queryResult.indexOf(item) === index);
}else {
  console.log('No locations found');
}
isLoading.value = false;

const search = async() => {
  const variables = {
    text: `%${text.value}%`,
    city: `%${city.value}%`,
    category: `%${category.value}%`,
    min_enterance_fee: minPrice.value,
    max_enterance_fee: maxPrice.value,
    tags: tagsList.value,
    skip: skip.value,
    take: take.value
  };

  if(tags.value.length === 0) {
    console.log(variables);
    isLoading.value = true;
    const { data } = await useAsyncQuery<Events>(searchEventQuery, variables); 
    console.log(data.value);
    if(data.value?.events) {
      events.value = data.value.events;
      totalEvents.value = data.value.events_aggregate.aggregate.count;
    }
    isLoading.value = false;
  }else {
    console.log(variables);
    isLoading.value = true;
    const { data } = await useAsyncQuery<Events>(searchEventQueryWithTags, variables); 
    console.log(data.value);
    if(data.value?.events) {
      events.value = data.value.events;
      totalEvents.value = data.value.events_aggregate.aggregate.count;
    }
    isLoading.value = false;
  }
}

minTrigger();
maxTrigger();
</script>

<template>
  <form class="flex items-center max-w-xl mx-auto mb-8 mt-8">
    <button data-modal-target="default-modal" data-modal-toggle="default-modal" type="button"
      class="text-gray bg-gray-50 border hover:border-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
      <FilterIcon /> Filters
    </button>

    <label for="simple-search" class="sr-only">Search</label>
    <div class="relative w-full">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <EventIcon />
      </div>
      <input type="text" id="text" name="text" v-model="text" @input="search"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
        placeholder="Search event title..."/>
    </div>

    <button type="button" @click="search"
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
                <label for="cities"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                <select id="cities" v-model="city"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500">
                  <option v-for="city in locations" :key="city" :value="city">{{ city }}</option>
                </select><br />
                <label for="categories"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                <select id="categories" v-model="category"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500">
                  <option value=""></option>
                  <option value="Concerts">Concerts</option>
                  <option value="Classes and Workshops">Classes and Workshops</option>
                  <option value="Festivals and Fairs">Festivals and Fairs</option>
                  <option value="Conferences">Conferences</option>
                  <option value="Corporate Events">Corporate Events</option>
                  <option value="Online Events">Online Events</option>
                </select><br />

                <div class="flex flex-col">
                  <label for="labels-range-input" class="block mb-6 text-sm font-medium text-gray-900 dark:text-white">Enterance fee (ETB)</label>
                  <div class="relative max-w-xl w-full">
                    <div>
                      <input type="range" step="100" :min="min" :max="max" v-model="minPrice" @input="minTrigger" class="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer">
                      <input type="range" step="100" :min="min" :max="max" v-model="maxPrice" @input="maxTrigger" class="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer">
                      <div class="relative z-10 h-2">
                        <div class="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200"></div>
                        <div class="absolute z-20 top-0 bottom-0 rounded-md bg-purple-300" :style="{ right: maxThumb + '%', left: minThumb + '%' }"></div>
                        <div class="absolute z-30 w-6 h-6 top-0 left-0 bg-purple-700 rounded-full -mt-2 -ml-1" :style="{ left: minThumb+'%' }"></div>
                        <div class="absolute z-30 w-6 h-6 top-0 right-0 bg-purple-700 rounded-full -mt-2 -mr-3" :style="{ right: maxThumb+'%' }"></div>
                      </div>
                    </div>
                  <div class="flex justify-between items-center py-5">
                    <div>
                      <input type="text" maxlength="5" @input="minTrigger" v-model="minPrice" class="px-3 py-2 border border-gray-200 rounded w-24 text-center">
                    </div>
                    <div>
                      <input type="text" maxlength="5" @input="maxTrigger" v-model="maxPrice" class="px-3 py-2 border border-gray-200 rounded w-24 text-center">
                    </div>
                  </div>
                  </div>
                </div>
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
  <client-only>
    <CircularProgressIndicator v-if="isLoading" />
    <div v-else-if="events.length === 0" class="flex flex-col items-center text-center w-full">
        <img src="../assets/images/empty.jpg" width="300" height="300" />
        <p class="text-2xl">No events :(</p><br />
    </div>    
    <div v-else class="flex flex-col items-center">
      <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-32 mx-auto">
        <EventCard v-for="event in events" :key="event.id" :id="event.id" :title="event.title" :description="event.description"
          :imageUrl="event.image" :location="event.location.venue + ', ' + event.location.city"
          :startDate="new Date(event.start_date)" :endDate="new Date(event.end_date)" :category="event.category.name">{{ event }}</EventCard>
      </div>
      <div class="flex flex-col items-center">
        <div class="inline-flex mt-10 xs:mt-0">
          <a v-if="skip >= 6" :href="`/events?skip=${skip > 0 ? skip - 6 : 0}&category=${category}&city=${city}&text=${text}&min=${minPrice}&max=${maxPrice}`">
            <span id="badge-dismiss-default" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-purple-800 underline rounded dark:bg-purple-900 dark:text-purple-300">Prev</span>
          </a>
          <span v-else id="badge-dismiss-default" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-purple-800 underline rounded dark:bg-purple-900 dark:text-purple-300">Prev</span>
          <a v-if="currentPage * 6 < totalEvents && events.length >= 6" :href="`/events?skip=${skip + 6}&category=${category}&city=${city}&text=${text}&min=${minPrice}&max=${maxPrice}`">
            <span id="badge-dismiss-default" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-purple-800 underline rounded dark:bg-purple-900 dark:text-purple-300">Next</span>
          </a>
        </div>
      </div>
    </div>
  </client-only>
  <Footer />
</template>

<style>
  input[type=range]::-webkit-slider-thumb {
    pointer-events: all;
    width: 24px;
    height: 24px;
    -webkit-appearance: none;
  }
</style>
