<template>
    <div>
        <b-img class="bot-image" height="30" v-bind:src="botIconSource" ></b-img>
    </div>
</template>
<script>

    export default {
        name: 'BImage',
        components: {},
        props: ['botIconSource'],
        data() {
            return {}
        },
        methods: {
        }
    }
</script>
<style scoped>
</style>
