<script setup lang="ts">
import { useForm } from "vee-validate";
import { required } from "../utils/helpers/validation";
import BirrIcon from "./icons/Birr.vue";


const { defineField, handleSubmit, errors } = useForm({
  validationSchema: {
    title: required,
    description: required,
    category: required,
    enrollmentFee: required,
    tags: required
  }
});

const [title, titleProps] = defineField('title');
const [description, descriptionProps] = defineField('description');
const [category, categoryProps] = defineField('category');
const [enrollmentFee, enrollmentFeeProps] = defineField('enrollment_fee');
const [tags, tagsProps] = defineField('tags');

const onFileChange = (e) => {
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length)
    return;
}

const onSubmit = handleSubmit(values => {
  console.log(values);
});

defineComponent({
  components: {
    BirrIcon,
  }
})

</script>

<template>
  <div class="flex flex-col justify-center items-center max-w-xl mt-4 mx-auto">
    <div class="flex flex-col items-center w-full max-w-xl p-4 bg-white  sm:p-6 md:p-8 dark:bg-gray-800">
      <h5 class="text-xl font-medium text-gray-900 dark:text-white">Create an event</h5><br />
      <form class="space-y-6 w-full" @submit="onSubmit" action="#">
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
          <label for="categories" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
          <select id="categories" v-model="category" v-bind="categoryProps"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500">
            <option selected>Choose a category</option>
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
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="event_poster">Upload
            file</label>
          <input
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="event_poster_help" id="event_poster" type="file" v-on:change="onFileChange">
          <div class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">An event poster grabs user's
            attention.</div>
        </div>
        <div>
          <label for="enrollment_fee" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enterance
            fee</label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <BirrIcon />
            </div>
            <input type="number" id="enrollment_fee"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              placeholder="999 birr" min="0" max="1500" v-model="enrollmentFee" v-bind="enrollmentFeeProps" />
          </div>
          <span class="text-sm text-red-600">{{ errors.enrollmentFee }}</span>
        </div>
        <div>
          <label for="tags" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tags</label>
          <input type="text" name="tags" id="tags" v-model="tags" v-bind="tagsProps"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="#tech, #meetup" />
          <span class="text-sm text-red-600">{{ errors.tags }}</span>
        </div>
        <button type="submit"
          class="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Create</button>
      </form>
    </div>
  </div>
</template>
