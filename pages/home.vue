<script setup lang="ts">
import { getEventsQuery } from "../utils/constants/queries/events";
import type { Event } from "../types/event";

const isLoading = ref(false);
const events = ref<Event[]>([]);
const totalEvents = ref(0);
const currentPage = ref(1);
const skip = ref(0);
const take = ref(6);

const variables = { 
  user_id: 79,
  skip: skip.value,
  take: take.value
};

const { data } = await useAsyncQuery(getEventsQuery, variables);
if(data.value?.events) {
  events.value = data.value.events;
  totalEvents.value = data.value.events_aggregate.aggregate.count;
}else {
  console.log('No events found');
}

const next = async() => {
  if(currentPage.value * 6 < totalEvents.value) {
    skip.value += 6;
    currentPage.value += 1;
    fetchMore();
  }
}

const prev = () => {
  if(skip.value > 0) {
    skip.value -= 6;
    currentPage.value -= 1;
    fetchMore();
  }
}

const fetchMore = async() => {
  const { data } = await useAsyncQuery(getEventsQuery, { user_id: 79, skip: skip.value, take: take.value });
  if(data.value?.events) {
    events.value = data.value.events;
    totalEvents.value = data.value.events_aggregate.aggregate.count;
  }else {
    console.log('No events found');
  }
}

</script>

<template>
  <SearchField :updateEvents="() => {}" /><br /><br />
  <client-only>
    <CircularProgressIndicator v-if="isLoading" />
    <div v-else-if="events.length === 0" class="flex flex-col items-center text-center w-full">
        <img src="../assets/images/empty.jpg" width="300" height="300" />
        <p class="text-2xl">No events :(</p><br />
    </div>    
    <div v-else class="flex flex-col items-center">
      <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-32 mx-auto">
        <EventCard v-for="event in events" :key="event.id" :title="event.title" :description="event.description"
          :imageUrl="event.image" :location="event.location.venue + ', ' + event.location.city"
          :startDate="new Date(event.start_date)" :endDate="new Date(event.end_date)" :category="event.category.name">{{ event }}</EventCard>
      </div>
      <div class="flex flex-col items-center">
        <div class="inline-flex mt-10 xs:mt-0">
            <button @click="prev" class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-purple-700 rounded-s hover:bg-purple-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Prev
            </button>
            <button v-if="currentPage * 6 < totalEvents" @click="next" class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-purple-700 rounded-s hover:bg-purple-900 dark:bg-purple-800 dark:border-purple-700 dark:text-white-400 dark:hover:bg-white-700 dark:hover:text-purple">
                Next
            </button>
        </div>
      </div>
    </div>
  </client-only>
  <Footer />
</template>
