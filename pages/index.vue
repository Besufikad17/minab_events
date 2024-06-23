<script setup lang="ts">
  import { features } from "../utils/constants/strings";
  import AccountIcon from "../components/icons/Account.vue";
  import ControlIcon from "../components/icons/Control.vue";
  import EventSearchIcon from "~/components/icons/EventSearch.vue";
  import type { Category, CategoryResponse } from "~/types/category";
  import { ref, defineComponent } from "vue";
  import { GetCategories } from "~/utils/constants/queries/category";

  const icons = [EventSearchIcon, AccountIcon, ControlIcon];

  const isLoading = ref(false);
  const categories = ref<Category[]>([]);

  isLoading.value = true;
  const { data } = await useAsyncQuery<CategoryResponse>(GetCategories);
  if (data.value) {
    categories.value = data.value.categories;
    isLoading.value = false;
  }else {
    console.log("No categories found");
  }
  isLoading.value = false;

  defineComponent({
    components: {
      AccountIcon,
      ControlIcon,
      EventSearchIcon
    }
  });
</script>

<template>
  <div class="bg-gradient-to-r from-indigo-800 via-purple-600 via-20% to-pink-600 p-10">
    <div class="flex flex-col items-center mt-10 mb-10">
      <h1 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-white md:text-5 xl lg:text-6xl dark:text-white">The Simplest Way to</h1>
      <h1 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-white md:text-5 xl lg:text-6xl dark:text-white">Manage Events</h1><br/>
      <p class="mb-6 text-center text-lg font-normal text-white lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Minab Events is a modern event management system focused on ease of use. The system is web-based and easy to operate both on desktop and mobile, focusing primarily on the user experience.</p>
      <div class="flex flex-row space-x-6 items-center">
        <a href="#contact">
          <button class="text-white text-sm px-5 py-2.5 text-center me-2 mb-2 rounded-full border-2 border-white dark:focus:ring-purple-800">Contact Us</button>
        </a>
        <a href="#features">
          <button type="button" class="text-purple-700 bg-white hover:bg-purple-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-purple-400 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Features</button>
        </a>
      </div>
    </div>
  </div>
  <div class="flex flex-col items-center mt-20 mb-20">
    <h2 class="text-4xl font-extrabold dark:text-white" id="features">Features</h2><br/>
    <p class="mb-6 text-center text-lg font-normal lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
      Our system offers a wide range of ready features to fit the needs of our everyday customer. We also offer our customers custom made features. Don't see yours here? Contact us and we can see what we can do for you.
    </p>
    <div class="flex flex-row items-center mt-5 mb-5">
      <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-32 mx-auto">
        <FeaturesCard v-for="(feature, index) in features" :key="index" :title="feature" :icon="icons[index]" />        
      </div>
    </div>
  </div>
  <client-only>
    <CircularProgressIndicator v-if="isLoading" />
    <div class="flex flex-col items-center mt-20 mb-20">
      <h2 class="text-4xl font-extrabold dark:text-white">What We Do</h2><br/>
      <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 mx-auto">
        <ImageCard v-for="(category, index) in categories" :key="index" :title="category.name" :image="`url(${category.image})`" :link="`/events?category=${category.name}`" />
      </div>
    </div>
  </client-only>
  <div class="flex flex-col items-center mt-20">
    <h2 class="text-4xl font-extrabold dark:text-white">Contact Us</h2><br/>
    <p class="text-center text-lg font-normal lg:text-xl sm:px-16 dark:text-gray-400">
      Think Minab Events is the solutions to your needs? 
    </p>
    <p class="mb-6 text-center text-lg font-normal lg:text-xl sm:px-16 dark:text-gray-400">
      please send us a line and we will get back to you as soon as possible.
    </p>
  </div>
  <div id="contact"><ContactForm/></div>
  <Footer />
</template>
