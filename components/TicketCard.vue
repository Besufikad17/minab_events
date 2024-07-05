<script setup lang="ts">
  import { ReserveEventMutation, UpdateReservation } from "~/utils/constants/queries/reservations";
  import type { ReserveEventResponse } from "../types/reservation";
  import CloseIcon from "~/components/icons/Close.vue";
  import ErrorIcon from "~/components/icons/Error.vue";
  import LoadingIcon from "./icons/Loading.vue";
  import RemoveIcon from "./icons/Remove.vue";
  import SuccessIcon from "~/components/icons/Success.vue";
  
  const isLoading = ref(false);
  const isError = ref(false);
  const message = ref("");

  const props = defineProps({
      cardType: String,
      isReservable: {
        type: Boolean,
        default: false
      },
      isReserved: {
        type: Boolean,
        default: false
      },
      isReservedTicket: {
        type: Boolean,
        default: false
      },
      reservationStatus: {
        type: String,
        default: ""
      },
      event_id: {
        type: Number,
        default: null
      },
      user_id: {
        type: Number,
        default: null
      },
      ticket_id: {
        type: Number,
        default: null
      },
      name: String,
      description: String,
      price: Number,
      remove: Function
    }
  );
    
  defineComponent({
    CloseIcon,
    ErrorIcon,
    LoadingIcon,
    RemoveIcon,
    SuccessIcon
  });

  const reserveEvent = () => {
    const variables = {
        event_id: props.event_id!,
        user_id: props.user_id!,
        ticket_id: props.ticket_id!,
        status: "pending"
    };    

    const { mutate: reserveEventMutation } = useMutation<ReserveEventResponse>(ReserveEventMutation, { variables });
    isLoading.value = true;
    reserveEventMutation().then(async(result) => {
      if(result?.data?.ReserveEvent.checkoutUrl && props.price !== 0) {
        await navigateTo(result?.data?.ReserveEvent.checkoutUrl, {
          external: true
        });
      }else {
        const variables = { user_id: props.user_id!, event_id: props.event_id!};
        const { mutate: updateReservation } = await useMutation(UpdateReservation, { variables });
        updateReservation().then(result => {
          message.value = "Event reserved successfully";
          setTimeout(() => {
              message.value = "";
          }, 5000);
          window.location.reload();
        }).catch(error => {
          console.log(error);
          isError.value = true;
          message.value = "Failed to reserve event";
        });
      }
    }).catch((error) => {
        console.log(error);
        isError.value = true;
        message.value = "Failed to reserve event";
    });
    isLoading.value = false;
  }

  function toggle() {
    message.value = "";
    isError.value = false;
  }
</script>

<template>
    <div id="toast-top-right" v-if="message.length !== 0" class="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
        <div v-if="isError" class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
            <ErrorIcon />
            <span class="sr-only">Error icon</span>
        </div>
        <div v-else class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-purple-100 rounded-lg dark:bg-purple-800 dark:text-purple-200">
            <SuccessIcon />
            <span class="sr-only">Success icon</span>
        </div>
        <div class="ms-3 text-sm font-normal">{{ message }}</div>
            <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-top-right" aria-label="Close" @click="toggle">
            <span class="sr-only">Close</span>
            <CloseIcon />
        </button>
    </div>
    <div class="flex flex-row items-start w-64 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div class="p-5">
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{{ name }}</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ description }}</p>
        <span v-if="price === 0" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300">FREE</span>
        <p v-else class="text-sm text-gray-500 dark:text-gray-400">{{ price }} ETB</p>
        <div v-if="isReservable" class="mt-4">
          <div v-if="isReserved">
            <button v-if="isReservedTicket && reservationStatus === 'completed'" class="text-white bg-purple-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mr-4 text-center dark:bg-purple-600" disabled>
              Reserved
            </button>
            <span v-else-if="isReservedTicket && reservationStatus === 'pending'" class="italic mb-3 font-small text-purple-700 dark:text-gray-400">Reservation pending</span>
          </div>
          <div v-else>
            <button v-if="isLoading" type="submit" class="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800" disabled>
              <LoadingIcon />
            </button>
            <button v-else @click="reserveEvent" class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mr-4 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
              Reserve
            </button>
          </div>
        </div>
      </div>
      <button v-if="cardType === 'create'" type="button" class="inline-flex items-center p-2 ms-2 text-sm text-purple-400 bg-transparent rounded-sm hover:bg-purple-200 hover:text-purple-900 dark:hover:bg-purple-800 dark:hover:text-purple-300" data-dismiss-target="#badge-dismiss-default" aria-label="Remove" @click="(() => remove!(name))">
        <RemoveIcon />
        <span class="sr-only">Remove badge</span>
      </button>
    </div>
</template>