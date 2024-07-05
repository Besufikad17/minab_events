<script setup lang="ts">
    import { useForm } from 'vee-validate';
    import { required } from '~/utils/helpers/validation';
    import { ref } from 'vue';
    import { SendCommentMutation } from '~/utils/constants/queries/comments';
    import CloseIcon from "./icons/Close.vue";
    import ErrorIcon from "./icons/Error.vue";
    import LoadingIcon from "./icons/Loading.vue";
    import SuccessIcon from "./icons/Success.vue";

    const isLoading = ref(false);
    const isError = ref(false);
    const response = ref("");

    const { defineField, handleSubmit, errors } = useForm({
        initialValues: {
            name: "",
            email: "",
            message: "",
        },
        validationSchema: {
            name: required,
            email: required,
            message: required,
        },
    });

    const [name, nameProps] = defineField("name");
    const [email, emailProps] = defineField("email");
    const [message, messageProps] = defineField("message");

    function toggle() {
        message.value = "";
        isError.value = false;
    }

    const variables = {
        name: name.value,
        email: email.value,
        message: message.value,
    };

    const onSubmit = handleSubmit(async values => {
        console.log(values);
        isLoading.value = true;
        const { mutate: sendComment } = await useMutation(SendCommentMutation, { variables });
        sendComment({
          name: name.value,
          email: email.value,
          message: message.value,
        }).then(res => {
          console.log(response);
          message.value = "Comment sent successfully";
          setTimeout(() => {
            message.value = "";
          }, 5000);
          window.location.reload();
        }).catch(err => {
            isError.value = true;
            message.value = "Failed to send comment";
            console.log(err);
        });
    });
</script>

<template>
  <div id="toast-top-right" v-if="response.length !== 0"
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
    <div class="ms-3 text-sm font-normal">{{ response }}</div>
    <button type="button"
      class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
      data-dismiss-target="#toast-top-right" aria-label="Close" @click="toggle">
      <span class="sr-only">Close</span>
      <CloseIcon />
    </button>
  </div>
  <div class="flex flex-col justify-center items-center max-w-xl mx-auto">
    <div class="flex flex-col items-center w-full max-w-xl p-4 bg-white  sm:p-6 md:p-8 dark:bg-gray-800">
      <form class="space-y-6 w-full" @submit.prevent="onSubmit" action="#">
        <div class="flex flex-row space-x-4 w-full">
          <div>
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input type="text" name="name" id="name" v-model="name" v-bind="nameProps"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Your name" />
            <span class="text-sm text-red-600">{{ errors.name }}</span>
          </div>
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="email" name="email" id="email" v-model="email" v-bind="emailProps"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Your email" />
            <span class="text-sm text-red-600">{{ errors.email }}</span>
          </div>
        </div>
        <div>
          <label for="description"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Message</label>
          <textarea id="description" v-model="message" v-bind="messageProps" rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
            placeholder="Description"></textarea>
          <span class="text-sm text-red-600">{{ errors.message }}</span>
        </div>
        <button v-if="isLoading" type="submit"
          class="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800" disabled>
          <LoadingIcon />
        </button>
        <button v-else type="submit" 
          class="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Send</button>
      </form>
    </div>
  </div>
</template>

