<script setup lang="ts">
import { ref } from "vue";
import { useForm } from "vee-validate";
import { required, isValidEmail, isValidPhoneNumber } from "../../utils/helpers/validation";
import { registerMutation } from "../../utils/constants/queries";
import ErrorIcon from "../../components/icons/Error.vue";
import CloseIcon from "../../components/icons/Close.vue";
import LoadingIcon from "../../components/icons/Loading.vue";

definePageMeta({
  layout: "auth"
});

const { $locally } = useNuxtApp();
const errorMessage = ref("");
const isLoading = ref(false);
const isError = ref(false);

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: {
    firstName: required,
    lastName: required,
    email: isValidEmail,
    phoneNumber: isValidPhoneNumber,
    password: required,
    confirmPassword: required,
  }
});

const [firstName, firstNameProps] = defineField('firstName');
const [lastName, lastNameProps] = defineField('lastName');
const [email, emailProps] = defineField('email');
const [phoneNumber, phoneNumberProps] = defineField('phoneNumber');
const [password, passwordProps] = defineField('password');
const [confirmPassword, confirmPasswordProps] = defineField('confirmPassword');

const variables = {
  first_name: firstName.value,
  last_name: lastName.value,
  email: email.value,
  phone_number: phoneNumber.value,
  password: password.value
};

const { mutate: register } = useMutation(registerMutation, {
  variables
});

const onSubmit = handleSubmit(values => {
  if (password.value === confirmPassword.value) {
    console.log(values);
    isLoading.value = true;
    register({
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      phone_number: phoneNumber.value,
      password: password.value
    }).then((res) => {
      $locally.setItem('token', res.data.Register.token);
      // TODO: redirect to home page
    }).catch((err) => {
      console.log(err);
      isError.value = true;
      if (err.toString().split(".")[0] === "ApolloError: Uniqueness violation") {
        errorMessage.value = "Email or phone number already in use!!"
      } else {
        errorMessage.value = err;
      }
    });
    isLoading.value = false;
  } else {
    alert("Please confirm your password properly!!")
  }
});

const toggle = () => {
  isError.value = false;
}

defineComponent({
  components: {
    ErrorIcon,
    CloseIcon,
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
  <div class="flex flex-col justify-center items-center max-w-xl mt-8 mx-auto">
    <div
      class="flex flex-col items-center w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <img src="../../assets/images/logo.png" class="h-16" alt="Minab Events Logo" />
      <h5 class="text-xl font-medium text-gray-900 dark:text-white">Sign up</h5><br />
      <form class="space-y-6 w-full" @submit="onSubmit" action="#">
        <div class="flex flex-row w-full">
          <div class="mr-6">
            <label for="firstName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your first
              name</label>
            <input type="text" name="firstName" id="firstName" v-model="firstName" v-bind="firstNameProps"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="John" />
            <span class="text-sm text-red-600">{{ errors.firstName }}</span>
          </div>
          <div>
            <label for="lastName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your last
              name</label>
            <input type="text" name="lastName" id="lastName" v-model="lastName" v-bind="lastNameProps"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Doe" />
            <span class="text-sm text-red-600">{{ errors.lastName }}</span>
          </div>
        </div>
        <div class="flex flex-row w-full">
          <div class="mr-6">
            <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone
              number</label>

            <input type="text" id="phoneNumber" name="phoneNumber" v-model="phoneNumber" v-bind="phoneNumberProps"
              aria-describedby="helper-text-explanation"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              placeholder="123-456-7890" required />
            <span class="text-sm text-red-600">{{ errors.phoneNumber }}</span>
          </div>
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" name="email" id="email" v-model="email" v-bind="emailProps"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com" />
            <span class="text-sm text-red-600">{{ errors.email }}</span>
          </div>
        </div>
        <div class="flex flex-row w-full">
          <div class="mr-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
              password</label>
            <input type="password" name="password" id="password" placeholder="••••••••" v-model="password"
              v-bind="passwordProps"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
            <span class="text-sm text-red-600">{{ errors.password }}</span>
          </div>
          <div>
            <label for="confirmPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
              your
              password</label>
            <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••"
              v-model="confirmPassword" v-bind="confirmPasswordProps"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
            <span class="text-sm text-red-600">{{ errors.confirmPassword }}</span>
          </div>
        </div>
        <button disabled type="button" v-if="isLoading"
          class="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
          <LoadingIcon />
          Loading...
        </button>
        <button v-else type="submit"
          class="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Create
          account</button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Already have account? <a href="/auth/login" class="text-purple-700 hover:underline dark:text-purple-500">Sign
            in</a>
        </div>
      </form>
    </div>
  </div>
</template>
