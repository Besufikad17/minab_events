<script setup lang="ts">
    import { ref } from "vue";
    import type { PaymentResponse } from "~/types/payments";
    import type { TicketResponse } from "~/types/tickets";
    import { GetPaymentById, UpdatePaymentStatus } from "~/utils/constants/queries/payment";
    import { GetTicketById } from "~/utils/constants/queries/tickets";
    import { UpdateReservation } from "~/utils/constants/queries/reservations";
    import { jwtDecode } from "jwt-decode";
    import ErrorIcon from "~/components/icons/Error.vue";
    import SuccessIcon from "~/components/icons/Success.vue";
    import CloseIcon from "~/components/icons/Close.vue";
   
    const route = useRoute();
    const isLoading = ref(false);
    const isError = ref(false);
    const message = ref("");
    const decoded = ref({} as any);

    const token = useCookie('token');
    if (token.value && token.value !== null) {
        decoded.value = jwtDecode(token.value!);
        console.log(decoded.value);
    } else {
        await navigateTo("/auth/login");
    }

    isLoading.value = true;
    let variables = { id: route.query.pid };
    const { data } = await useAsyncQuery<PaymentResponse>(GetPaymentById, variables);
    if(data.value?.payments) {
        const { data: ticketsResult } = await useAsyncQuery<TicketResponse>(GetTicketById, { id: data.value.payments[0].ticket_id });
        variables = { id: route.query.pid };
        const { mutate: updatePayment } = await useMutation(UpdatePaymentStatus, { variables });

        updatePayment().then(async result => {
            const variables = { user_id: decoded.value.id, event_id: ticketsResult.value?.tickets[0].event_id };
            const { mutate: updateReservation } = await useMutation(UpdateReservation, { variables });

            updateReservation().then(result => {
                message.value = "Payment verified successfully";
                setTimeout(() => {
                    navigateTo(`/events/${ticketsResult.value?.tickets[0].event_id}`);
                }, 3000);
            }).catch(err => {
                message.value = "Payment verification failed";
                isError.value = true;
            });
        }).catch(err => {
            message.value = "Payment verification failed";
            isError.value = true;
        });
    }else {
        message.value = "Payment not found";
        isError.value = true;
        setTimeout(() => {
            message.value = "";
        }, 5000);
    }
    isLoading.value = false;

    function toggle() {
        isError.value = false;
        message.value = "";
    }

    defineComponent({
        CloseIcon,
        ErrorIcon,
        SuccessIcon,
    })
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
    <div class="flex flex-row space-x-4 items-center justify-center">
        <CircularProgressIndicator v-if="isLoading" /> Verifying payment...
    </div>
</template>