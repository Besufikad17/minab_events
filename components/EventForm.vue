<script setup lang="ts">
import { useForm } from "vee-validate";
import { required } from "../utils/helpers/validation";
import { ref } from "vue";
import BirrIcon from "./icons/Birr.vue";
import CloseIcon from "./icons/Close.vue";
import ErrorIcon from "./icons/Error.vue";
import LoadingIcon from "./icons/Loading.vue";
import LocationIcon from "./icons/Location.vue";
import SuccessIcon from "./icons/Success.vue";
import { AddEventQuery, UpdateEventMutation } from "~/utils/constants/queries/events";
import { jwtDecode } from "jwt-decode";
import type { Tag } from "../types/tags";
import type { Image } from "~/types/images";
import type { Location, GeoApifyResponse } from "~/types/locations";

const config = useRuntimeConfig();

const isLoading = ref(false);
const isError = ref(false);
const message = ref("");
const decoded = ref({} as any);

const token = useCookie('token');
if(token.value && token.value !== null) {
  decoded.value = jwtDecode(token.value!);
}else {
  await navigateTo("/auth/login");
}

const props = defineProps({
  id: Number,
  locationId: Number,
  type: String,
  title: String,
  description: String,
  category: String,
  images: Array<String>,
  thumbnail :String,
  enteranceFee: Number,
  startDate: Date,
  endDate: Date,
  tags: String,
  city: String,
  venue: String,
  lat: Number,
  lng: Number
});

const images = ref(props.images ? props.images : props.thumbnail ? [props.thumbnail] : [] as string[]);
const thumbnail = ref(props.thumbnail || "");
const tagsList = ref(props.tags ? props.tags?.split(",") : [] as string[]);
const searchResult = ref([] as Location[]);
const isSelected = ref(props.city ? true : false);
const selectedLocation = ref({
  city: props.city,
  venue: props.venue,
  latitude: props.lat,
  longtiude: props.lng
} as Location);

const { defineField, handleSubmit, errors } = useForm({
  initialValues: {
    title: props.title || '',
    description: props.description || '',
    category: props.category || '0',
    enteranceFee: props.enteranceFee || 0,
    startDate: props.startDate?.toISOString().substring(0, 10) || new Date().toISOString().substring(0, 10),
    endDate: props.endDate?.toISOString().substring(0, 10) || new Date().toISOString().substring(0, 10),
    tags: props.tags || '',
    city: props.city || '',
    venue: props.venue || '',
    location: selectedLocation.value.venue || ''
  },
  validationSchema: {
    title: required,
    description: required,
    category: required,
    startDate: required,
    endDate: required,
    location: required
  }
});

const [title, titleProps] = defineField('title');
const [description, descriptionProps] = defineField('description');
const [category, categoryProps] = defineField('category');
const [enteranceFee, enteranceFeeProps] = defineField('enteranceFee');
const [startDate, startDateProps] = defineField('startDate');
const [endDate, endDateProps] = defineField('endDate');
const [tags, tagsProps] = defineField('tags');
const [location, locationProps] = defineField('location');

const variables = {
  user_id: decoded.value.id,
  title: title.value,
  description: description.value,
  category_id: parseInt(category.value),
  enterance_fee: enteranceFee.value,
  start_date: new Date(startDate.value),
  end_date: new Date(endDate.value),
  tags: tagsList.value,
  city: selectedLocation.value.city,
  venue: selectedLocation.value.venue,
  lat: selectedLocation.value.latitude,
  lng: selectedLocation.value.longtiude,
  images: images.value
};

const { mutate: addEvent } = await useMutation(AddEventQuery, { variables });

const onSubmit = handleSubmit(async () => {
  console.log(images.value);
  isLoading.value = true;
  if(props.type === "create") {
    addEvent({
      user_id: decoded.value.id,
      title: title.value,
      description: description.value,
      category_id: parseInt(category.value),
      enterance_fee: enteranceFee.value,
      start_date: new Date(startDate.value),
      end_date: new Date(endDate.value),
      tags: tagsList.value,
      city: selectedLocation.value.city,
      venue: selectedLocation.value.venue,
      lat: selectedLocation.value.latitude,
      lng: selectedLocation.value.longtiude,
      images: images.value
    }).then(response => {
      console.log(response);
      message.value = "Event created successfully";
      setTimeout(() => {
        message.value = "";
      }, 5000);
      window.location.reload();
    }).catch(err => {
      isError.value = true;
      message.value = "Failed to create event";
      console.log(err)
    });
  }else {
    const variables = {
      id: props.id,
      title: title.value,
      description: description.value,
      category_id: parseInt(category.value),
      enterance_fee: enteranceFee.value,
      start_date: new Date(startDate.value),
      end_date: new Date(endDate.value),
      tags: [] as Tag[],
      location_id: props.locationId,
      city: selectedLocation.value.city,
      venue: selectedLocation.value.venue,
      lat: selectedLocation.value.latitude,
      lng: selectedLocation.value.longtiude,
      thumbnail: thumbnail.value,
      images: [] as Image[]
    };

    const { mutate: editEvent } = await useMutation(UpdateEventMutation, { variables });

    editEvent({
      id: props.id,
      title: title.value,
      description: description.value,
      category_id: parseInt(category.value),
      enterance_fee: enteranceFee.value,
      start_date: new Date(startDate.value),
      end_date: new Date(endDate.value),
      tags: tagsList.value.map(tag => {
        return {
          event_id: props.id,
          name: tag
        }
      }),
      location_id: props.locationId,
      city: selectedLocation.value.city,
      venue: selectedLocation.value.venue,
      lat: selectedLocation.value.latitude,
      lng: selectedLocation.value.longtiude,
      thumbnail: images.value[0] as string,
      images: images.value.map(image => {
        return {
          event_id: props.id,
          url: image
        } as Image
      })
    }).then(response => {
      console.log(response);
      message.value = "Event updated successfully";
      setTimeout(() => {
        message.value = "";
      }, 5000);
      navigateTo(`/events/${props.id}`);
    }).catch(err => {
      isError.value = true;
      message.value = "Failed to update event";
      console.log(err)
    });
  }
  isLoading.value = false;
});

function upload(file: any) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', config.public.CLOUDINARY_UPLOAD_PRESET);

  fetch(config.public.CLOUDINARY_URL, {
    method: 'POST',
    body: formData,
  })
  .then(response => response.json())
  .then((data) => {
    if (data.secure_url !== '') {
      console.log(data.secure_url);
      images.value.push(data.secure_url);
    }
  })
  .catch(err => console.error(err));
}

function onFileChange(e: any) {
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length)
    return;
  
  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    let rawImg;
    reader.onloadend = () => {
      rawImg = reader.result;
      images.value.push(rawImg as string);
    }
    reader.readAsDataURL(files[i]);
  }
}

function removeImage(image: string) {
  console.log(image);
  images.value = images.value.filter((img) => img !== image);
}

function addTag() {
  if (tags.value.length > 0) {
    const newTags = tags.value.split(",");
    tagsList.value.push(...newTags);
    tags.value = ""
  }
}

function removeTag(tag: string) {
  tagsList.value = tagsList.value.filter((t: string) => t !== tag);
}

function toggle() {
  message.value = "";
  isError.value = false;
}

const selectLocation = (index: number) => {
  selectedLocation.value = searchResult.value[index];
  location.value = searchResult.value[index].venue;
  isSelected.value = true;
  console.log(selectedLocation.value);
}

const searchLocation = async() => {
  searchResult.value = [];
  isSelected.value = false;
  const result = await $fetch<GeoApifyResponse>(`${config.public.PLACE_API_URL}?text=${location.value}&apiKey=${config.public.PLACE_API_KEY}`);
  if(result.features) {
   result.features.map(feature => {
      if(feature.properties.name) {
        const newLocation = {
          venue: feature.properties.name,
          city: feature.properties.city,
          longtiude: feature.properties.lon,
          latitude: feature.properties.lat
        } as Location;
        searchResult.value.push(newLocation);
      }
    });
  }
}

defineComponent({
  components: {
    BirrIcon,
    CloseIcon,
    ErrorIcon,
    LoadingIcon,
    LocationIcon,
    SuccessIcon
  }
});

</script>

<template>
  <div id="toast-top-right" v-if="message.length !== 0"
    class="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
    role="alert">
    <div v-if="isError"
      class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
      <ErrorIcon />
      <span class="sr-only">Error icon</span>
    </div>
    <div v-else
      class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-purple-100 rounded-lg dark:bg-purple-800 dark:text-purple-200">
      <SuccessIcon />
      <span class="sr-only">Success icon</span>
    </div>
    <div class="ms-3 text-sm font-normal">{{ message }}</div>
    <button type="button"
      class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
      data-dismiss-target="#toast-top-right" aria-label="Close" @click="toggle">
      <span class="sr-only">Close</span>
      <CloseIcon />
    </button>
  </div>
  <div class="flex flex-col justify-center items-center max-w-xl mt-4 mx-auto">
    <div class="flex flex-col items-center w-full max-w-xl p-4 bg-white  sm:p-6 md:p-8 dark:bg-gray-800">
      <h5 class="text-xl font-medium text-gray-900 dark:text-white">{{ props.type === "create" ? 'Create an event' : 'Edit an event' }}</h5><br />
      <form class="space-y-6 w-full" @submit.prevent="onSubmit" action="#">
        <div>
          <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
          <input type="text" name="title" id="title" v-model="title" v-bind="titleProps"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Event title" />
          <span class="text-sm text-red-600">{{ errors.title }}</span>
        </div>
        <div>
          <label for="description"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
          <textarea id="description" v-model="description" v-bind="descriptionProps" rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
            placeholder="Description"></textarea>
          <span class="text-sm text-red-600">{{ errors.description }}</span>
        </div>
        <div>
          <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
          <select id="category" v-model="category" v-bind="categoryProps"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500">
            <option value="0">Choose a category</option>
            <option value="1">Concerts</option>
            <option value="2">Classes and Workshops</option>
            <option value="3">Festivals and Fairs</option>
            <option value="4">Conferences</option>
            <option value="5">Corporate Events</option>
            <option value="6">Online Events</option>
          </select>
          <span class="text-sm text-red-600">{{ errors.category }}</span>
        </div>
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="event_posters">Upload
            files</label>
          <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="event-posters" type="file" multiple v-on:change="onFileChange">
          <div class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">Upload multiple images to grab user's attention. The first image will be taken as thumbnail.</div>
          <div class="grid grid-cols-1 sm:grid-cols-2 mt-5 gap-5">
            <UploadedImage v-for="image in images" :image="(image as string)" :onClose="removeImage" />
          </div>
        </div>
        <div>
          <label for="enteranceFee" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enterance
            fee</label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <BirrIcon />
            </div>
            <input type="number" id="enteranceFee"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              placeholder="999 birr" min="0" max="1500" v-model="enteranceFee" v-bind="enteranceFeeProps" />
          </div>
          <span class="text-sm text-red-600">{{ errors.enteranceFee }}</span>
        </div>
        <div class="flex flex-row w-full">
          <div class="w-full mr-8">
            <label for="startDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start
              date</label>
            <input id="startDate" type="date" v-model="startDate" v-bind="startDateProps"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              placeholder="Select date">
          </div>
          <div class="w-full">
            <label for="endDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End
              date</label>
            <input id="endDate" type="date" v-model="endDate" v-bind="endDateProps"
              class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              placeholder="Select date">
          </div>
        </div>
        <!-- FIXME use Google maps API -->
        <div>
          <label for="location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
          <div class="flex flex-row w-full">
            <div class="mr-4 w-full">
              <input type="text" name="location" id="location" v-model="location" v-bind="locationProps"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Location" @input="searchLocation"  />
              <div v-if="location.length > 0 && !isSelected" class="z-10 overflow-y-scroll w-60 h-40 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
                <ul class="list-none">
                  <li v-for="(location, i) in searchResult" className=" cursor-pointer border-gray-300 p-2 px-4 text-gray-700 hover:bg-purple-400" @click="() => selectLocation(i)">
                    {{ location.venue }}
                    <p id="helper-radio-text-4" class="text-xs font-normal text-gray-500 dark:text-gray-300">{{ location.city }}</p>
                  </li>
                </ul>
              </div>
            </div>  
            <div class="flex flex-row w-full items-center">
              <LocationIcon v-if="selectedLocation.venue" />
              <client-only>
                <a target="_blank" :href="`/events/map?lat=${selectedLocation.latitude}&lng=${selectedLocation.longtiude}`">
                  <span id="badge-dismiss-default" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-purple-800 hover:underline rounded dark:text-purple-300">{{ selectedLocation.venue }}</span>
                </a>
              </client-only>
            </div>
          </div>
          <span class="text-sm text-red-600">{{ errors.location }}</span>
        </div> 
        <div>
          <label for="tags" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tags</label>
          <div class="flex flex-row w-full">
            <div class="mr-4 w-full">
              <input type="text" name="tags" id="tags" v-model="tags" v-bind="tagsProps"
                class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="#tech, #meetup" />
            </div>
            <div>
              <button type="button" @click="addTag"
                class="w-36 text-purple-800 bg-gray border border-purple-800  focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Add</button>
            </div>
          </div>
          <span class="text-sm text-red-600">{{ errors.tags }}</span>
        </div>
        <div class="grid-cols-4 gap-4">
          <span id="badge-dismiss-default" v-for="tag in tagsList" v-bind:key="tag"
            class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-purple-800 bg-purple-100 rounded dark:bg-purple-900 dark:text-purple-300">{{
              tag }}
            <button type="button"
              class="inline-flex items-center p-1 ms-2 text-sm text-purple-400 bg-transparent rounded-sm hover:bg-purple-200 hover:text-purple-900 dark:hover:bg-purple-800 dark:hover:text-purple-300"
              data-dismiss-target="#badge-dismiss-default" aria-label="Remove" @click="(() => removeTag(tag))">
              <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span class="sr-only">Remove badge</span>
            </button>
          </span>
        </div>
        <!-- TODO Add ticket -->
        <button v-if="isLoading" type="submit"
          class="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800" disabled>
          <LoadingIcon />
        </button>
        <button type="submit" 
          class="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">{{ type === "create" ? 'Create' : 'Edit' }}</button>
      </form>
    </div>
  </div>
  <Footer />
</template>

<style>
  ::-webkit-scrollbar {
    width: 1px;
  }
  
  ::-webkit-scrollbar-track {
      background: #fff;
      border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb {
      background: #5521B5;
      border-radius: 5px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
      background: #fff;
  }
</style>