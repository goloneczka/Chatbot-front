<template>
    <div>
        <div id="weather-component">
            <UserMessage :text="$t('weather.user.choiceWeather')" />
            <BotMessage :text="$t('weather.bot.introduction')" />
            <BImage :botIconSource=this.botIconSource />
            <CityDropdown/>
        </div>
        <TimeDropdown v-if="timeDropdown"/>
        <div>
            <b-button id="endWeatherTalkButton" v-if="thxButton" class="m-2" v-on:click="this.endWeatherTalk">{{$t('weather.user.thank')}}</b-button>
            <b-button id="moreDetailsButton" v-if="thxButton" class="m-2" v-on:click="this.moreDetails">{{$t('weather.user.moreDetails')}}</b-button>
        </div>

        <EndWeatherButton v-if="endButton"/>
    </div>
</template>
<script>

    import { weatherService } from "../../../App";

    import Vue from "vue";
    import TimeDropdown from "./models/TimeDropdown";
    import UserMessage from "./models/UserMessage";
    import BotMessage from "./models/BotMessage";
    import CityDropdown from "./models/CityDropdown";
    import BImage from "./models/BImage";
    import WeatherMessage from "./models/WeatherMessage";
    import EndWeatherButton from "./models/EndWeatherButton"
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
                this.addUserMessage(`${this.$t('weather.user.chooseCity')} ${value}`);
                this.city = value;
                document.getElementById("dropdown-button").remove();
                this.addBotMessage(this.$t('weather.bot.choiceTime'));
                this.addDropdownTime();
            },
            showWeather(value) {
                this.addUserMessage(`${this.$t('weather.user.myChoice')} ${value}`);
                this.addBotMessage(`${this.$t('weather.bot.myPredictions')} ${this.city} ${this.$t('weather.bot.in')} ${value}....`);
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
                weatherService.getWeatherData(this.city, this.time).then((weatherData) => {
                    weatherData.city = this.city;
                    weatherData.time = this.time;
                    this.weatherData = weatherData;
                    let ComponentClass = Vue.extend(WeatherMessage);
                    let instance = new ComponentClass();
                    instance.data = weatherData;
                    instance.$mount();
                    document.getElementById("weather-component").appendChild(instance.$el);
                    this.addBotImage();
                });
            },
            endWeatherTalk() {

                const div = document.getElementById('moreDetailsButton');
                if(div!== null){
                    div.remove();
                }

                document.getElementById('endWeatherTalkButton').remove();

                this.addUserMessage(this.$t('weather.user.thank'));
                this.addBotMessage(this.$t('weather.bot.couldHelp'));
                this.addBotMessage(this.$t('weather.bot.anythingToDo'));
                this.showOtherCategoryButton();
            },
            moreDetails() {

                document.getElementById('moreDetailsButton').remove();

                this.addUserMessage(this.$t('weather.user.moreDetails'));
                let ComponentClass = Vue.extend(WeatherDetailsMessage);
                let instance = new ComponentClass();
                console.log(this.weatherData);
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
