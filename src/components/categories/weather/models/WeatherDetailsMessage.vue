<template>
    <div>
        <ul>
            <li class="message">
                <div>
                    <a>
                        <h3>{{this.city}}</h3>
                        <h5>Temperatura: {{this.temperature}}</h5>
                        <h5>Odczuwalna temperatura: {{this.feelTemperature}}</h5>
                        <h5>Zachmurzenie: {{this.cloudy}}</h5>
                        <h5>Ciśnienie powietrza: {{this.airPressure}}</h5>
                        <h5>Wilgotnośc: {{this.humidity}}</h5>
                        <h5>Prędkość wiatru: {{this.windSpeed}}</h5>
                    </a>
                </div>
            </li>
        </ul>
        <UserButton/>
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
                weather: 'Słonecznie',
                temperature: '30°C',
                feelTemperature: '31°C',
                cloudy: 'brak',
                airPressure: '1000hPa',
                humidity: '0.3',
                windSpeed: '5.59 km/h',
            }
        },
        mounted() {
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
