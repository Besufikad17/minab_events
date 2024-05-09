<script setup lang="ts">
import { useForm } from "vee-validate";
import { required, isValidEmail } from "../../utils/helpers/validation";
import { registerMutation } from "../../utils/constants/strings";

definePageMeta({
  layout: "auth"
});

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: {
    firstName: required,
    lastName: required,
    email: isValidEmail,
    phoneNumber: required,
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
    register().then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  } else {
    alert("Please confirm your password properly!!")
  }
});

</script>

<template>
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
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" required />
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
        <div class="flex items-start">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input id="remember" type="checkbox" value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 checked:bg-purple-700 focus:ring-3 focus:ring-purple-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-purple-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
            </div>
            <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
          </div>
        </div>
        <button type="submit"
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
