<script setup lang="ts">
  import { ref } from "vue";
  import { jwtDecode } from "jwt-decode";
  import type { Bookmarks, BookmarkedEvents } from "~/types/bookmark";
  import { GetBookmarksQuery } from "~/utils/constants/queries/bookmarks";
import { emptyAnimation } from "~/utils/constants/strings";

  const route = useRoute();
  const isLoading = ref(false);
  const events = ref<BookmarkedEvents[]>([]);
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

  const { data } = await useAsyncQuery<Bookmarks>(GetBookmarksQuery, variables);
  if(data.value?.bookmarks) {
    events.value = data.value.bookmarks;
    totalEvents.value = data.value.bookmarks_aggregate.aggregate.count;
  }else {
    console.log('No events found');
  }
</script>

<template>
  <client-only>
    <CircularProgressIndicator v-if="isLoading" />
    <div v-else class="flex flex-col items-center">
      <h5 class="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-8">Bookmarks</h5><br />
      <div v-if="events.length > 0" class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-32 mx-auto">
        <EventCard v-for="event in events" :key="event.event.id" :id="event.event.id" :title="event.event.title" :description="event.event.description"
          :imageUrl="event.event.thumbnail" :location="event.event.location.city ? event.event.location.venue + ', ' + event.event.location.city : event.event.location.venue"
          :startDate="new Date(event.event.start_date)" :endDate="new Date(event.event.end_date)" :category="event.event.category.name">{{ event }}</EventCard>
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
    <div class="flex flex-col items-center">
        <div class="inline-flex mt-10 xs:mt-0">
          <a v-if="skip >= 6" :href="`/events/bookmarks?skip=${skip > 0 ? skip - 6 : 0}`">
            <span id="badge-dismiss-default" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-purple-800 underline rounded dark:bg-purple-900 dark:text-purple-300">Prev</span>
          </a>
          <span v-else id="badge-dismiss-default" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-purple-800 underline rounded dark:bg-purple-900 dark:text-purple-300">Prev</span>
          <a v-if="currentPage * 6 < totalEvents && events.length >= 6" :href="`/events/bookmarks?skip=${skip + 6}`">
            <span id="badge-dismiss-default" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-purple-800 underline rounded dark:bg-purple-900 dark:text-purple-300">Next</span>
          </a>
        </div>
      </div>
  </client-only>
  <Footer />
</template>