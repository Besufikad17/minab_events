<script lang="ts">
    export default {
        props: {
            title: String,
            image: String,
            link: String
        }
    }
</script>

<template>
    <div class="image-container">
        <div class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed" style="background-color: rgba(0, 0, 0, 0.6)">
            <div class="flex h-full items-center justify-center">
                <div class="text-white">
                    <a :href="link">{{ title }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
    .image-container {
      position: relative;
      overflow: hidden;
      padding: 12rem;
      text-align: center;
      border-radius: 12px;
      background: v-bind("$props.image") no-repeat left center fixed;
    }
</style>