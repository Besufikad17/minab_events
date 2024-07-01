<script setup lang="ts">
import { GetEventByIdQuery, DeleteEventMutation } from "../../utils/constants/queries/events";
import { BookmarkMutation, UnBookmarkMutation } from "../../utils/constants/queries/bookmarks";
import { ReserveEventMutation } from "../../utils/constants/queries/reservations";
import { getDateTime, isBookmarked as checkIsBookmarked, isReserved as checkIsReserved } from "../../utils/helpers/data";
import { jwtDecode } from "jwt-decode";
import { initCarousels } from "flowbite";
import type { EventResponse, Events } from "~/types/event";
import BookmarkIcon from "~/components/icons/Bookmark.vue";
import BookmarkedIcon from "~/components/icons/Bookmarked.vue";
import LoadingIcon from "~/components/icons/Loading.vue";
import ErrorIcon from "~/components/icons/Error.vue";
import SuccessIcon from "~/components/icons/Success.vue";
import CloseIcon from "~/components/icons/Close.vue";

const route = useRoute();
const isLoading = ref(false);
const isError = ref(false);
const isBookmarked = ref(false);
const isReserved = ref(false);
const message = ref("");
const event = ref<EventResponse | undefined>(undefined);
const fullDate = ref("");
const decoded = ref({} as any);
const index = ref(0);

const token = useCookie('token');
if (token.value && token.value !== null) {
    decoded.value = jwtDecode(token.value!);
    console.log(decoded.value);
} else {
    await navigateTo("/auth/login");
}

isLoading.value = true;
const variables = { id: route.params.id };
const { data } = await useAsyncQuery<Events>(GetEventByIdQuery, variables);
console.log(data);
if (data.value) {
    console.log(data.value.events[0]);
    event.value = data.value.events[0];
    fullDate.value = getDateTime(new Date(event.value.start_date), new Date(event.value.end_date));
    isBookmarked.value = checkIsBookmarked(decoded.value.id, event.value?.bookmarks!);
    isReserved.value = checkIsReserved(decoded.value.id, event.value?.reserved_events!);
} else {
    console.log('Event not found'!!);
}
isLoading.value = false;

const deleteEvent = async() => {
    const variables = {
        id: event.value?.id,
        location_id: event.value?.location.id
    };
    const { mutate: deleteEventMutation } = await useMutation(DeleteEventMutation, { variables });
    deleteEventMutation({
        id: event.value?.id,
        location_id: event.value?.location.id
    }).then((result) => {
        message.value = "Event deleted successfully";
        setTimeout(() => {
            message.value = "";
        }, 5000);
        navigateTo(`/events/my`);
    }).catch((error) => {
        console.log(error);
        isError.value = true;
        message.value = "Failed to delete event";
        console.log(error);
    });
}

const bookmarkEvent = () => {
    const variables = {
        event_id: event.value?.id,
        user_id: decoded.value.id
    };    

    const { mutate: bookmarkEventMutation } = useMutation(BookmarkMutation, { variables });
    bookmarkEventMutation({
        event_id: event.value?.id,
        user_id: decoded.value.id
    }).then((result) => {
        message.value = "Event bookmarked successfully";
        setTimeout(() => {
            message.value = "";
        }, 5000);
        window.location.reload();
    }).catch((error) => {
        console.log(error);
        isError.value = true;
        message.value = "Failed to bookmark event";
        console.log(error);
    });
}

const unBookmarkEvent = () => {
    const variables = {
        event_id: event.value?.id,
        user_id: decoded.value.id
    };    

    const { mutate: bookmarkEventMutation } = useMutation(UnBookmarkMutation, { variables });
    bookmarkEventMutation({
        event_id: event.value?.id,
        user_id: decoded.value.id
    }).then((result) => {
        message.value = "Event unbookmarked successfully";
        setTimeout(() => {
            message.value = "";
        }, 5000);
        window.location.reload();
    }).catch((error) => {
        console.log(error);
        isError.value = true;
        message.value = "Failed to unbookmark event";
        console.log(error);
    });
}

const reserveEvent = () => {
    const variables = {
        event_id: event.value?.id,
        user_id: decoded.value.id
    };    

    const { mutate: reserveEventMutation } = useMutation(ReserveEventMutation, { variables });
    reserveEventMutation({
        event_id: event.value?.id,
        user_id: decoded.value.id
    }).then((result) => {
        message.value = "Event reserved successfully";
        setTimeout(() => {
            message.value = "";
        }, 5000);
        window.location.reload();
    }).catch((error) => {
        console.log(error);
        isError.value = true;
        message.value = "Failed to reserve event";
        console.log(error);
    });
}

function toggle() {
  message.value = "";
  isError.value = false;
}

onMounted(() => {
    setTimeout(() => {
        initCarousels();
    }, 1000)
})

defineComponent({
    components: {
        BookmarkIcon,
        BookmarkedIcon,
        ErrorIcon,
        LoadingIcon,
        SuccessIcon,
        CloseIcon
    }
});
</script>

<template>
    <div id="toast-top-right" v-if="message.length !== 0" class="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
        <div v-if="isError" class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
            <ErrorIcon />
            <span class="sr-only">Error icon</span>
        </div>
        <div v-else class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-purple-100 rounded-lg dark:bg-purple-800 dark:text-purple-200">
            <SuccessIcon />
            <span class="sr-only">Success icon</span>
        </div>
        <div class="ms-3 text-sm font-normal">{{ message }}</div>
            <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-top-right" aria-label="Close" @click="toggle">
            <span class="sr-only">Close</span>
            <CloseIcon />
        </button>
    </div>
    <client-only>
        <CircularProgressIndicator v-if="isLoading" />
        <div v-else-if="event === undefined" class="flex flex-col items-center text-center w-full">
            <img src="../../assets/images/empty.jpg" width="300" height="300" />
            <p class="text-2xl">Event not found :(</p><br />
        </div>
        <div v-else class="flex flex-col max-w-4xl mt-8 mx-auto">
            <div class="flex flex-col justify-center md:flex-row w-full">
                <div class="sm:mb-5 p-8">
                    <div>
                        <a :href="event?.thumbnail" target="_blank">
                            <img class="min-w-full md:min-w-72 md:max-w-96 md:pt-0 md:px-0 rounded-lg" :src="event.thumbnail" alt="">
                        </a>
                    </div>
                </div>
                <div class="pl-5 pr-5">
                    <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{{ event?.title }}
                    </h5>
                    <div class="flex flex-row space-x-8">
                        <p class="text-sm text-gray-500 dark:text-gray-400">{{ fullDate }}</p>
                        <a :href="`/events?category=${event?.category.name}`"><span id="badge-dismiss-default"
                            class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-purple-800 bg-purple-100 hover:underline rounded dark:bg-purple-900 dark:text-purple-300">{{
                                event?.category.name }}</span></a>
                    </div><br />
                    <div>
                        <p class="mb-8 font-normal text-gray-700 dark:text-gray-400">{{ event?.description }}</p>
                    </div>
                    <p>Location:
                        <client-only>
                            <a target="_blank" :href="`/events/map?lat=${event.location.latitude}&lng=${event.location.longtiude}`">
                                <span v-if="event?.location.city" class="text-sm text-gray-500 dark:text-gray-400">{{ event?.location.full_location
                                    }}</span>
                                <span v-else class="text-sm text-gray-500 dark:text-gray-400">{{ event?.location.venue }}</span>
                            </a>
                        </client-only>
                    </p>
                    <div v-if="event.tags.length > 0" class="grid-cols-4 gap-4 mt-4">
                        Tags: <a href="#"><span id="badge-dismiss-default" v-for="tag in event?.tags" :key="tag.id"
                                class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-purple-800 bg-purple-100 rounded dark:bg-purple-900 dark:text-purple-300">{{
                                    tag.name }}</span></a>
                    </div>
                    <div v-if="decoded.id === event?.user_id" class="flex flex-row mt-4">
                        <a :href="`/events/edit?id=${event?.id}`">
                            <button
                                class="w-sm text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-4 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Edit</button>
                        </a>
                        <button @click="deleteEvent"
                            class="w-sm text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete</button>
                    </div>
                    <div v-else class="flex flex-row mt-4">
                        <button v-if="isReserved"  @click="reserveEvent"
                            class="text-white bg-purple-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mr-4 text-center dark:bg-purple-600" disabled>
                            Reserved
                        </button>
                        <button v-else  @click="reserveEvent"
                            class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mr-4 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                            Attend
                        </button>
                        <button v-if="isBookmarked" @click="unBookmarkEvent"
                            class="text-purple-700 border border-purple-700 inline-flex focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900">
                            <BookmarkedIcon /> Bookmarked
                        </button>
                        <button v-else @click="bookmarkEvent"
                            class="text-purple-700 border border-purple-700 inline-flex focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900">
                            <BookmarkIcon /> Bookmark
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex flex-col mt-10 p-8">
                <h5 class="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Gallery</h5>
                <div id="default-carousel" class="relative w-full sm-px-6" data-carousel="static">
                    <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
                        <div v-if="event.images && event.images.length > 0" v-for="(image, index) in event.images" :key="index" class="hidden duration-700 ease-in-out" data-carousel-item>
                            <img :src="image.url" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
                        </div>
                        <div v-else class="hidden duration-700 ease-in-out" data-carousel-item>
                            <img :src="event.thumbnail" class="absolute block w-full -translate-x-1/2  left-1/2" alt="...">
                        </div>
                    </div>
                    <button type="button" class="absolute top-0 md:-top-10 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple/30 dark:bg-gray-800/30 group-hover:bg-purple/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-purple dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                            </svg>
                            <span class="sr-only">Previous</span>
                        </span>
                    </button>
                    <button type="button" class="absolute top-0 md:-top-10 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                            </svg>
                            <span class="sr-only">Next</span>
                        </span>
                    </button>
                </div>
            </div> 
        </div>
    </client-only>
    <Footer />
</template>
