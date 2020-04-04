<template>
    <div>
        <b-button id="chooseCategoryButton" class="m-2" v-on:click="onClick">{{ $t('bot.categoryJokes')}}</b-button>
        <b-button class="m-2" v-on:click="onClick">{{ $t('bot.categoryWeather')}}</b-button>
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
