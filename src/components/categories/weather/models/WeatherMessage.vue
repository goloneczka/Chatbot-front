<template>
    <div>
        <ul>
            <li class="message">
                <div>
                    <a>
                        <img alt='Weather' height="70" src="../../../common/images/sun.png"/>
                        <h3>{{this.city}}</h3>
                        <h5>Pogoda: {{this.weather}}</h5>
                        <h5>Temperatura: {{this.temperature}}</h5>
                        <h5>Zachmurzenie: {{this.cloudy}}</h5>
                    </a>
                </div>
            </li>
        </ul>
        <UserButton/>
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
                weather: 'Słonecznie',
                temperature: '30°C',
                cloudy: 'brak',
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
        text-align: center;
    }
</style>
