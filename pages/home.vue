<script lang="ts">
import { events } from "../utils/constants/strings";

export default {
  data() {
    return {
      isLoading: false,
      events: events
    }
  }
}
</script>

<template>
  <SearchField /><br /><br />
  <client-only>
    <CircularProgressIndicator v-if="isLoading" />
    <div v-else class="flex items-center">
      <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-32 mx-auto">
        <EventCard v-for="event in events" :key="event.id" :title="event.title" :description="event.description"
          :imageUrl="event.image" :location="event.location.venue + ', ' + event.location.city"
          :startDate="event.startDate" :endDate="event.endDate" :category="event.category">{{ event }}</EventCard>
      </div>
    </div>
  </client-only>
  <Footer />
</template>
