<script setup lang="ts">
    import { ref } from "vue";
    import { jwtDecode } from "jwt-decode";
    import { GetEventByIdQuery } from "../../utils/constants/queries/events";
    import { getTagsList } from "../../utils/helpers/data";

    const route = useRoute();
    const isLoading = ref(false);
    const event = ref<Event | undefined>(undefined);
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
    const { data } = await useAsyncQuery(GetEventByIdQuery, variables);
    if (data.value?.events) {
        event.value = data.value.events[0];
        if(event.value?.tags) {
          tagsList.value = getTagsList(event.value?.tags);
        }
    } else {
        console.log('Event not found'!!);
    }
    isLoading.value = false
</script>

<template>
  <EventForm 
    :title="event?.title"
    :description="event?.description"
    :category="event?.category.id.toString()"
    :enteranceFee="event?.enterance_fee"
    :startDate="new Date(event?.start_date)"
    :endDate="new Date(event?.end_date)"
    :tags="tagsList"
    :city="event?.location.city"
    :venue="event?.location.venue"
  />
</template>