<script setup lang="ts">
import ErrorIcon from "../../components/icons/Error.vue";
import CloseIcon from "../../components/icons/Close.vue";
import LoadingIcon from "../../components/icons/Loading.vue";
import { useForm } from "vee-validate";
import { required, isValidEmail } from "../../utils/helpers/validation";
import { loginMutation } from "../../utils/constants/queries";
import { ref } from "vue";

definePageMeta({
  layout: "auth"
});

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: {
    email: isValidEmail,
    password: required
  }
});

const rememberMe = ref(false);
const errorMessage = ref("");
const isLoading = ref(false);
const isError = ref(false);

const [email, emailProps] = defineField('email');
const [password, passwordProps] = defineField('password');

const variables = {
  login_text: email.value,
  password: password.value,
  remember_me: rememberMe.value
};

const { mutate: login } = useMutation(loginMutation, { variables });

const onSubmit = handleSubmit(async values => {
  console.log(values);
  isLoading.value = true;
  login({
    login_text: email.value,
    password: password.value,
    remember_me: rememberMe.value
  }).then((res) => {
    const token = useCookie('token');
    token.value = res!.data.Login.token;
    navigateTo("/home");
  }).catch((err) => {
    console.log(err);
    isError.value = true;
    errorMessage.value = err.message;
  })
  isLoading.value = false;
});

const toggle = () => {
  isError.value = false;
}

defineComponent({
  components: {
    CloseIcon,
    ErrorIcon,
    LoadingIcon
  }
})

</script>

<template>
  <div id="toast-top-right" v-if="isError"
    class="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
    role="alert">
    <div
      class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
      <ErrorIcon />
      <span class="sr-only">Error icon</span>
    </div>
    <div class="ms-3 text-sm font-normal">{{ errorMessage }}</div>
    <button type="button"
      class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
      data-dismiss-target="#toast-top-right" aria-label="Close" @click="toggle">
      <span class="sr-only">Close</span>
      <CloseIcon />
    </button>
  </div>
  <div class="flex flex-col justify-center items-center max-w-xl mt-16 mx-auto">
    <div
      class="flex flex-col items-center w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <img src="../../assets/images/logo.png" class="h-16" alt="Minab Events Logo" /><br />
      <h5 class="text-xl font-medium text-gray-900 dark:text-white">Sign in</h5><br />
      <form class="space-y-6 w-full" @submit="onSubmit" action="#">
        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" name="email" id="email" v-model="email" v-bind="emailProps"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com" />
          <span class="text-sm text-red-600">{{ errors.email }}</span>
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
            password</label>
          <input type="password" name="password" id="password" placeholder="••••••••" v-model="password"
            v-bind="passwordProps"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
          <span class="text-sm text-red-600">{{ errors.password }}</span>
        </div>
        <div class="flex items-start">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input id="remember" type="checkbox" v-model="rememberMe" name="remember"
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 checked:bg-purple-700 focus:ring-3 focus:ring-purple-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-purple-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
            </div>
            <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
          </div>
        </div>
        <button disabled type="button" v-if="isLoading"
          class="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
          <LoadingIcon />
          Loading...
        </button>
        <button v-else type="submit"
          class="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Login to
          your account</button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered? <a href="/auth/signup" class="text-purple-700 hover:underline dark:text-purple-500">Create
            account</a>
        </div>
      </form>
    </div>
  </div>
</template>
