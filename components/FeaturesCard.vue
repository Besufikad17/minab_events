<script lang="ts">
    export default {
        props: {
            title: String,
            icon: {
                type: [String, Object],
                default: 'svg'
            }
        }
    }
</script>

<template>
    <div class="flex flex-col items-center p-10 w-72 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <component :is="icon"></component>
        <h3 class="text-center text-md mt-7 font-semibold text-gray-800 dark:text-gray-100">{{ title }}</h3>
    </div>
</template>