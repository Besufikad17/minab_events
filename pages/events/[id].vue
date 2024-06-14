<script setup lang="ts">
import { GetEventByIdQuery } from "../../utils/constants/queries/events";
import { getDateTime } from "../../utils/helpers/data";
import { jwtDecode } from "jwt-decode";
import BookmarkIcon from "~/components/icons/Bookmark.vue";
import LoadingIcon from "../../components/icons/Loading.vue";

const route = useRoute();
const isLoading = ref(false);
const event = ref<Event | undefined>(undefined);
const fullDate = ref("");
const decoded = ref({} as any);

const token = useCookie('token');
if (token.value && token.value !== null) {
    decoded.value = jwtDecode(token.value!);
    console.log(decoded.value);
} else {
    await navigateTo("/auth/login");
}

isLoading.value = true;
const variables = { id: route.params.id };
const { data } = await useAsyncQuery(GetEventByIdQuery, variables);
if (data.value?.events) {
    console.log(data.value.events[0]);
    event.value = data.value.events[0];
    fullDate.value = getDateTime(new Date(event.value.start_date), new Date(event.value.end_date));
} else {
    console.log('Event not found'!!);
}
isLoading.value = false;

defineComponent({
    components: {
        BookmarkIcon,
        LoadingIcon
    }
});
</script>

<template>
    <client-only>
        <CircularProgressIndicator v-if="isLoading" />
        <div v-else-if="event === undefined" class="flex flex-col items-center text-center w-full">
            <img src="../../assets/images/empty.jpg" width="300" height="300" />
            <p class="text-2xl">Event not found :(</p><br />
        </div>
        <div v-else class="flex flex-col justify-center items-center max-w-4xl mt-8 mx-auto">
            <div class="flex flex-col md:flex-row">
                <div>
                    <a :href="event?.image" target="_blank">
                        <img class="min-w-full md:min-w-72 md:max-w-96 px-5 md:pt-0 md:px-0" :src="event?.image"
                            alt="" />
                    </a><br />
                </div>
                <div class="pl-5 pr-5">
                    <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{{ event?.title }}
                    </h5>
                    <div class="flex flex-row justify-between">
                        <p class="text-sm text-gray-500 dark:text-gray-400">{{ fullDate }}</p>
                        <a :href="`/home?category=${event?.category.name}`"><span id="badge-dismiss-default"
                            class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-purple-800 bg-purple-100 hover:underline rounded dark:bg-purple-900 dark:text-purple-300">{{
                                event?.category.name }}</span></a>
                    </div><br />
                    <div>
                        <p class="mb-8 font-normal text-gray-700 dark:text-gray-400">{{ event?.description }}</p>
                    </div>
                    <p class="mb-4">Enterance fee:
                        <span class="text-sm text-gray-500 dark:text-gray-400">{{ event?.enterance_fee }} Birr</span>
                    </p>
                    <p>Location:
                        <span class="text-sm text-gray-500 dark:text-gray-400">{{ event?.location.full_location
                            }}</span>
                    </p>
                    <!-- TODO Link to browse events -->
                    <div v-if="event.tags.length > 0" class="grid-cols-4 gap-4 mt-4">
                        Tags: <a href="#"><span id="badge-dismiss-default" v-for="tag in event?.tags" :key="tag"
                                class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-purple-800 bg-purple-100 rounded dark:bg-purple-900 dark:text-purple-300">#{{
                                    tag.name }}</span></a>
                    </div>
                    <div v-if="decoded.id === event?.user_id" class="flex flex-row mt-4">
                        <!-- TODO Link to events form -->
                        <a :href="`/events/edit?id=${event?.id}`">
                            <button
                                class="w-sm text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-4 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Edit</button>
                        </a>
                        <!-- TODO add event listener -->
                        <button
                            class="w-sm text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete</button>
                    </div>
                    <!-- TODO check if it's bookmarked or reserved -->
                    <div v-else class="flex flex-row mt-4">
                        <!-- TODO add event listener -->
                        <button
                            class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mr-4 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                            Attend
                        </button>
                        <!-- TODO add event listener -->
                        <button
                            class="text-purple-700 border border-purple-700 inline-flex focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900">
                            <BookmarkIcon /> Bookmark
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </client-only>
    <Footer />
</template>
