<template>
    <div>
        <div id="weather-component">
            <UserMessage text="Chce poznać pogodę."/>
            <BotMessage text="Świetnie ! A jakie chcesz miasto? "/>
            <BImage :botIconSource=this.botIconSource />
            <CityDropdown/>
        </div>
        <TimeDropdown v-if="timeDropdown"/>
        <div>
            <b-button id="endWeatherTalkButton" v-if="thxButton" variant="outline-dark" v-on:click="this.endWeatherTalk">Dzięki!</b-button>
            <b-button id="moreDetailsButton" v-if="thxButton" variant="outline-dark" v-on:click="this.moreDetails">Chcę
                szczegóły
            </b-button>
        </div>

        <EndWeatherButton v-if="endButton"/>
    </div>
</template>
<script>

    //import { weatherService} from "../../../App";

    import Vue from "vue";
    import TimeDropdown from "./models/TimeDropdown";
    import UserMessage from "./models/UserMessage";
    import BotMessage from "./models/BotMessage";
    import CityDropdown from "./models/CityDropdown";
    import BImage from "./models/BImage";
    import WeatherMessage from "./models/WeatherMessage";
    import EndWeatherButton from "./models/EndWeatherButton";
    import WeatherDetailsMessage from "./models/WeatherDetailsMessage";

    export default {
        name: 'Weather',
        components: {EndWeatherButton, UserMessage, TimeDropdown, BotMessage, CityDropdown, BImage},
        props: ['botIconSource'],
        data: function () {
            return {
                city: '',
                time: '',
                timeDropdown: false,
                endButton: false,
                thxButton: false,
                weatherData: '',
            }
        },
        mounted() {
            this.$root.$on('cityDropdownOnClick', (text) => {
                this.cityDropdownOnClick(text);
            });
            this.$root.$on('showWeather', (data) => {
                this.time = data[1];
                this.showWeather(data[0]);
            });
            this.$root.$on('event', () => {
                this.endWeatherTalk();
            });
        },
        methods: {
            cityDropdownOnClick(value) {
                this.addUserMessage(`Wybieram miasto ${value}`);
                this.city = value;
                document.getElementById("dropdown-button").remove();
                this.addBotMessage("Swietnie ! Wybierz teraz czas! ");
                this.addDropdownTime();
            },
            showWeather(value) {
                this.addUserMessage(`Wybieram ${value}`);
                this.time = value;
                this.addBotMessage(`Swietnie! Oto moje przewidywania dla ${this.city} w ${value}....`);
                this.addWeatherMessage();
                this.thxButton = true;

            },
            addBotMessage(text) {
                let ComponentClass = Vue.extend(BotMessage);
                let instance = new ComponentClass();
                instance.text = text;
                instance.$mount();
                document.getElementById("weather-component").appendChild(instance.$el);

                this.addBotImage()

            },
            addUserMessage(text) {
                const ComponentClass = Vue.extend(UserMessage);
                const instance = new ComponentClass();
                instance.text = text;
                instance.$mount();
                document.getElementById("weather-component").appendChild(instance.$el);
            },
            addDropdownTime() {
                this.timeDropdown = true;
            },
            addWeatherMessage() {

                //get data from server
                //this.weatherData= JSON.parse(weatherService.getWeatherData(this.city, this.time));

                let ComponentClass = Vue.extend(WeatherMessage);
                let instance = new ComponentClass();
                instance.data = `${this.city}%${this.time}`;
                instance.$mount();
                document.getElementById("weather-component").appendChild(instance.$el);

                this.addBotImage();

            },
            endWeatherTalk() {

                const div = document.getElementById('moreDetailsButton');
                if(div!== null){
                    div.remove();
                }

                document.getElementById('endWeatherTalkButton').remove();

                this.addUserMessage("Dzięki!");
                this.addBotMessage("Cieszę się że mogłem pomóc :D");
                this.addBotMessage("Jest coś co jeszcze mogę dla ciebie zrobić?");
                this.showOtherCategoryButton();
            },
            moreDetails() {

                document.getElementById('moreDetailsButton').remove();

                let ComponentClass = Vue.extend(WeatherDetailsMessage);
                let instance = new ComponentClass();
                instance.data = this.weatherData;
                instance.$mount();
                document.getElementById("weather-component").appendChild(instance.$el);

                this.addBotImage();
            },
            showOtherCategoryButton() {
                this.endButton = true;
            },
            addBotImage() {
                const array = document.getElementsByClassName('bot-image');
                array.item(array.length - 1).remove();

                const ComponentClass = Vue.extend(BImage);
                const instance = new ComponentClass();
                instance.botIconSource = this.botIconSource;
                instance.$mount();
                document.getElementById("weather-component").appendChild(instance.$el);
            }
        },

    }
</script>
<style scoped>

</style>
