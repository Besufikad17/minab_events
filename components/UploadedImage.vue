<script lang="ts">
    export default {
        props: {
            image: String,
            onClose: Function
        }
    }
</script>

<template>
    <article tabindex="0" class="group hasImage w-48 h-32 rounded-md focus:outline-none focus:shadow-outline bg-gray-100 hover:border-gray-700 cursor-pointer relative text-transparent hover:text-white shadow-sm">
        <img alt="upload preview" :src="image" class="img-preview w-full h-full sticky object-cover rounded-md bg-contain" />
        <section class="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
            <div class="flex">
                <a v-if="image?.startsWith('http')" target="_blank" :href="image">
                    <span id="badge-dismiss-default" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-purple-800 bg-purple-100 hover:underline rounded dark:bg-purple-900 dark:text-purple-300">Preview</span></a>
                <p class="p-1 size text-xs"></p>
                <button type="button" class="delete ml-auto focus:outline-none hover:bg-red-500 p-1 rounded-md" @click="(e) => onClose!(image)">
                    <svg class="pointer-events-none fill-current w-4 h-4 ml-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path class="pointer-events-none" d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" />
                    </svg>
                </button>
            </div>
        </section>
    </article>
</template>