<template>
    <div>
        <ul>
            <li class="message">
                <div>
                    <a>
                        <h3>{{this.city}}</h3>
                        <h5>{{$t('weather.bot.temperature')}} {{this.temperature}}</h5>
                        <h5>{{$t('weather.bot.perceivedTemperature')}} {{this.feelTemperature}}</h5>
                        <h5>{{$t('weather.bot.precipType')}} {{this.cloudy}}</h5>
                        <h5>{{$t('weather.bot.airPressure')}} {{this.airPressure}}</h5>
                        <h5>{{$t('weather.bot.humidity')}} {{this.humidity}}</h5>
                        <h5>{{$t('weather.bot.airSpeed')}} {{this.windSpeed}}</h5>
                    </a>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>



    export default {
        name: 'WeatherDetailsMessage',
        props: ['data'],
        components: {},
        data() {
            return {
                city: '',
                time: '',
                weather: '',
                temperature: '',
                feelTemperature: '',
                cloudy: '',
                airPressure: '',
                humidity: '',
                windSpeed: '',
            }
        },
        mounted() {
            this.weather = this.data.summary;
            this.temperature = this.data.temperature;
            this.feelTemperature = this.data.perceivedTemperature;
            this.cloudy = this.data.precipType;
            this.airPressure = this.data.pressure;
            this.humidity = this.data.humidity;
            this.windSpeed = this.data.windSpeed;
        },
        methods: {
        },

    }
</script>
<style scoped>
    .message > div {
        border-radius: var(--chat-box-message-bot-border-radius);
        width: auto;
    }
</style>
