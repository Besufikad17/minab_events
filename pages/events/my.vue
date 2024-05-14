<script setup lang="ts">
  import { ref } from "vue";
  import type { Event } from "../../types/event";
  import EmptyLottie from "../../components/lottie/Empty.vue";

  const isLoading = ref(false);
  const events: Ref<Event[]> = ref([]);

  defineComponent({
    components: {
      EmptyLottie
    }
  });
</script>
<template>
  <SearchField /><br /><br />
  <client-only>
    <CircularProgressIndicator v-if="isLoading" />
    <div v-else class="flex items-center">
      <div v-if="events.length > 0" class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-32 mx-auto">
        <EventCard v-for="event in events" :key="event.id" :title="event.title" :description="event.description"
          :imageUrl="event.image" :location="event.location.venue + ', ' + event.location.city"
          :startDate="event.startDate" :endDate="event.endDate" :category="event.category">{{ event }}</EventCard>
      </div>
      <div v-else class="text-center w-full">
        <p class="text-2xl">No events :(</p><br />
        <!-- <EmptyLottie /> -->
        <a href="/events/create" class="text-sm text-purple-600">Create an event</a>
      </div>
    </div>
  </client-only>
  <Footer />
</template>
