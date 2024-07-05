<script setup lang="ts">
  import { ref } from "vue";
  import { GetMyEventsQuery } from "../../utils/constants/queries/events";
  import { jwtDecode } from "jwt-decode";
  import { emptyAnimation } from "~/utils/constants/strings";
  import type { EventResponse, Events } from "../../types/event";
  import AddIcon from "../../components/icons/Add.vue";

  const route = useRoute();
  const isLoading = ref(false);
  const events = ref<EventResponse[]>([]);
  const totalEvents = ref(0);
  const currentPage = ref(1);
  const skip = ref(route.query.skip ? parseInt(route.query.skip as string) : 0);
  const take = ref(6);
  const decoded = ref({} as any);

  const token = useCookie('token');
  if (token.value && token.value !== null) {
      decoded.value = jwtDecode(token.value!);
  } else {
      await navigateTo("/auth/login");
  }

  const variables = { 
    user_id: decoded.value.id,
    skip: skip.value,
    take: take.value
  };

  const { data } = await useAsyncQuery<Events>(GetMyEventsQuery, variables);
  if(data.value?.events) {
    events.value = data.value.events;
    totalEvents.value = data.value.events_aggregate.aggregate.count;
  }else {
    console.log('No events found');
  }

  defineComponent({
    components: {
      AddIcon
    },
  });
</script>
<template>
  <client-only>
    <CircularProgressIndicator v-if="isLoading" />
    <div v-else class="flex flex-col items-center">
      <h5 class="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-8">My Events</h5><br />
      <div v-if="events.length > 0" class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-32 mx-auto">
        <EventCard v-for="event in events" :key="event.id" :id="event.id" :title="event.title" :description="event.description"
          :imageUrl="event.thumbnail" :location="event.location.city ? event.location.venue + ', ' + event.location.city : event.location.venue"
          :startDate="new Date(event.start_date)" :endDate="new Date(event.end_date)" :category="event.category.name">{{ event }}</EventCard>
      </div>
      <div v-else class="flex flex-col items-center text-center w-full">
        <client-only>
          <Vue3Lottie
            :animation-link="emptyAnimation"
            :height="200"
            :width="200"
            :loop="false"
          />
        </client-only>
        <p class="text-2xl">No events :(</p><br />
      </div>
    </div>
    <div class="fixed bottom-24 right-16">
      <a href="/events/create" class="text-sm text-purple-600">
        <button type="button" class="w-50 h-50 text-white bg-gradient-to-r rounded-full from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm text-center">
          <AddIcon />
        </button>
      </a>
    </div>
    <div class="flex flex-col items-center">
        <div class="inline-flex mt-10 xs:mt-0">
          <a v-if="skip >= 6" :href="`/events/my?skip=${skip > 0 ? skip - 6 : 0}`">
            <span id="badge-dismiss-default" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-purple-800 underline rounded dark:bg-purple-900 dark:text-purple-300">Prev</span>
          </a>
          <span v-else id="badge-dismiss-default" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-purple-800 underline rounded dark:bg-purple-900 dark:text-purple-300">Prev</span>
          <a v-if="currentPage * 6 < totalEvents && events.length >= 6" :href="`/events/my?skip=${skip + 6}`">
            <span id="badge-dismiss-default" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-purple-800 underline rounded dark:bg-purple-900 dark:text-purple-300">Next</span>
          </a>
        </div>
      </div>
  </client-only>
  <Footer />
</template>
