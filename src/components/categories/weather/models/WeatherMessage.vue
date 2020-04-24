<template>
    <div>
        <ul>
            <li class="message">
                <div>
                    <a>
                        <b-img height="80" v-bind:src="require(`../../../../assets/${this.src}.png`)"> </b-img>
                        <h3>{{this.city}}</h3>
                        <h5>{{this.weather}}</h5>
                        <h5>{{$t('weather.bot.temperature')}} {{this.temperature}}°C</h5>
                    </a>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>



    export default {
        name: 'WeatherMessage',
        props: ['data'],
        components: {},
        data() {
            return {
                city: '',
                time: '',
                weather: '',
                temperature: '',
                cloudy: '',
                src: '',
            }
        },
        mounted() {
            this.city = this.data.city;
            this.time = this.data.time;
            this.weather = this.data.summary;
            this.temperature = this.data.temperature;
            this.cloudy = this.data.precipType;
            this.src = this.data.icon;
        },
        methods: {
        },

    }
</script>
<style scoped>
    .message > div {
        border-radius: var(--chat-box-message-bot-border-radius);
        width: auto;
        text-align: center;
    }
</style>
