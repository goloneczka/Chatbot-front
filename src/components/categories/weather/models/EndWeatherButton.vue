<template>
    <div>
        <b-button id="chooseCategoryButton" variant="outline-dark" v-on:click="onClick">Żarty
        </b-button>
        <b-button variant="outline-dark" v-on:click="onClick">Pogoda
        </b-button>
    </div>
</template>
<script>

    export default {
        name: 'EndWeatherButton',
        components: {},
        data() {
            return {
                context: null
            }
        },
        methods: {
            onClick(){

            },
        }
    }
</script>
<style scoped>


</style>
