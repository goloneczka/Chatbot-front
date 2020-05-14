<template>
    <div>

        <div>
            <a>
                <h3>{{this.city}}</h3>
                <h5>{{$t('weather.bot.temperature')}} {{this.temperature}}°C</h5>
                <h5>{{$t('weather.bot.perceivedTemperature')}} {{this.feelTemperature}}°C</h5>
                <h5>{{$t('weather.bot.airPressure')}} {{this.airPressure}} hPa</h5>
                <h5>{{$t('weather.bot.humidity')}} {{this.humidity}}%</h5>
                <h5>{{$t('weather.bot.airSpeed')}} {{this.windSpeed}} km/h</h5>
            </a>
        </div>

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
                airPressure: '',
                humidity: '',
                windSpeed: '',
            }
        },
        mounted() {
            this.city = this.data.city;
            this.weather = this.data.summary;
            this.temperature = this.data.temperature;
            this.feelTemperature = this.data.perceivedTemperature;
            this.airPressure = this.data.pressure;
            this.humidity = this.data.humidity * 100;
            this.windSpeed = this.data.windSpeed;
        }

    }
</script>
<style scoped>
    .message > div {
        border-radius: var(--chat-box-message-bot-border-radius);
        width: auto;
    }
</style>
