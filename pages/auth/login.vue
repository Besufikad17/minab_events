<script setup lang="ts">
import { useForm } from "vee-validate";
import { required, isValidEmail } from "../../utils/helpers/validation";
import { loginMutation } from "../../utils/constants/strings";

definePageMeta({
  layout: "auth"
});

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: {
    email: isValidEmail,
    password: required
  }
});

const [email, emailProps] = defineField('email');
const [password, passwordProps] = defineField('password');

const variables = {
  loginText: "bese@gmail.com",
  password: "somepass"
};

const { mutate } = useMutation(loginMutation, { variables });

const onSubmit = handleSubmit(async values => {
  console.log(values);
  try {
    const result = await mutate({ variables });
    console.log(result);
  } catch (error) {
    console.error('Mutation error:', error);
  }
});

</script>

<template>
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
              <input id="remember" type="checkbox" value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 checked:bg-purple-700 focus:ring-3 focus:ring-purple-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-purple-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
            </div>
            <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
          </div>
          <a href="#" class="ms-auto text-sm text-purple-700 hover:underline dark:text-purple-500">Lost Password?</a>
        </div>
        <button type="submit"
          class="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Login
          to your account</button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered? <a href="/auth/signup" class="text-purple-700 hover:underline dark:text-purple-500">Create
            account</a>
        </div>
      </form>
    </div>
  </div>
</template>
