<script setup lang="ts">
import ExpandIcon from "./icons/Expand.vue";
import LogoutIcon from "./icons/Logout.vue";
import { ref } from "vue";
import { jwtDecode } from "jwt-decode";

const token = useCookie('token');
const isLoggedIn = ref(token.value && token.value !== null);
let decoded: any = {};

if (isLoggedIn.value) {
  decoded = jwtDecode(token.value!);
}

const logout = async() => {
  token.value = null;
  await navigateTo("/auth/login");
}

defineComponent({
  components: {
    ExpandIcon,
    LogoutIcon
  }
})
</script>

<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/home" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="../assets/images/logo.png" class="h-8" alt="Minab Events Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Minab Events</span>
      </a>
      <button data-collapse-toggle="navbar-default" type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul
            class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <template v-if="isLoggedIn!">
                <div class="flex flex-row items-center">
                  <li class="mr-4">
                    <a href="/events/my"
                      class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">My Events</a>
                  </li>
                  <li class="mr-4 ">
                    <a href="#"
                      class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Bookmarks</a>
                  </li>
                  <li class="mr-4">
                    <a href="#"
                      class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Attending</a>
                  </li>
                  <span class="text-sm flex-1 ms-3 mr-4 whitespace-nowrap">{{ decoded.email }}</span>
                  <button type="button" class="text-purple bg-white hover:bg-white-800 focus:ring-1 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800" @click="logout">
                    <LogoutIcon/>
                    <span class="sr-only">Logout</span>
                  </button>
                </div>
              </template>
              <template v-else>
                <li>
                  <a href="/auth/signup"
                    class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</a>
                </li>
                <li>
                  <a href="/auth/login"
                    class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</a>
                </li>
              </template>
          </ul>
        </div>
    </div>
  </nav>
</template>
