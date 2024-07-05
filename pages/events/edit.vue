<script setup lang="ts">
    import { ref } from "vue";
    import { jwtDecode } from "jwt-decode";
    import { GetEventByIdQuery } from "../../utils/constants/queries/events";
    import type { EventResponse, Events } from "../../types/event";

    const route = useRoute();
    const isLoading = ref(false);
    const event = ref<EventResponse | undefined>(undefined);
    const decoded = ref({} as any);
    const tagsList = ref("");

    const token = useCookie('token');
    if (token.value && token.value !== null) {
        decoded.value = jwtDecode(token.value!);
        console.log(decoded.value);
    } else {
        await navigateTo("/auth/login");
    }

    isLoading.value = true;
    const variables = { id: route.query.id };
    const { data } = await useAsyncQuery<Events>(GetEventByIdQuery, variables);
    if (data.value) {
        event.value = data.value.events[0];
        if(event.value) {
          const tags = event.value.tags.map((tag) => tag.name);
          tagsList.value = tags.join();
        }
    } else {
        console.log('Event not found'!!);
    }
    isLoading.value = false;
</script>

<template>
  <EventForm 
    :id="event?.id"
    :title="event?.title"
    :description="event?.description"
    :category="event?.category.id.toString()"
    :startDate="new Date(event?.start_date as string)"
    :endDate="new Date(event?.end_date as string)"
    :thumbnail="event?.thumbnail"
    :images="event?.images?.map((image) => image.url)"
    :tickets="event?.tickets"
    :tags="tagsList"
    :locationId="event?.location.id"
    :city="event?.location.city"
    :venue="event?.location.venue"
    :lat="event?.location.latitude"
    :lng="event?.location.longtiude"
  />
</template>