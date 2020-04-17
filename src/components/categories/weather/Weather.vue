<template>
    <div>
        <div id="weather-component">
            <UserMessage :text="$t('weather.user.choiceWeather')" />
            <BotMessage :text="$t('weather.bot.introduction')" />
            <BImage :botIconSource=this.botIconSource />
            <CityDropdown v-if="showCityDropdown"/>
            <div v-if="botCityMessage">
                <UserMessage :text="`${this.$t('weather.user.chooseCity')} ${this.city}`"  />
                <BotMessage :text="$t('weather.bot.choiceTime')" />
                <BImage :botIconSource=this.botIconSource  />
            </div>
            <TimeDropdown v-if="showTimeDropdown"/>
            <div v-if="botWeatherMessage">
                <UserMessage :text="`${this.$t('weather.user.myChoice')} ${this.userTime}`" />
                <BotMessage :text="`${this.$t('weather.bot.myPredictions')} ${this.city} ${this.$t('weather.bot.in')} ${this.userTime}....`" />
                <WeatherMessage :data="this.weatherData" />
                <BImage :botIconSource=this.botIconSource />
            </div>
            <div v-if="todoButtons">
                <b-button id="endWeatherTalkButton" class="m-2" v-on:click="this.endWeatherTalk">{{$t('weather.user.thank')}}</b-button>
                <b-button id="moreDetailsButton" class="m-2" v-on:click="this.moreDetails">{{$t('weather.user.moreDetails')}}</b-button>
            </div>
            <div v-if="details">
                <UserMessage :text="this.$t('weather.user.moreDetails')" />
                <WeatherDetailsMessage :data="this.weatherData" />
            </div>
            <div v-if="endWeather">
                <UserMessage :text="this.$t('weather.user.thank')"/>
                <BotMessage :text="this.$t('weather.bot.couldHelp')"/>
                <BotMessage :text="this.$t('weather.bot.anythingToDo')"/>
                <BImage :botIconSource=this.botIconSource />
            </div>
        </div>
    </div>
</template>
<script>

    import { weatherService } from "../../../App";

    import UserMessage from "./models/UserMessage";
    import BotMessage from "./models/BotMessage";
    import CityDropdown from "./models/CityDropdown";
    import BImage from "./models/BImage";
    import WeatherMessage from "./models/WeatherMessage";
    import WeatherDetailsMessage from "./models/WeatherDetailsMessage";
    import TimeDropdown from "./models/TimeDropdown";

    export default {
        name: 'Weather',
        components: {WeatherDetailsMessage, WeatherMessage, TimeDropdown, UserMessage, BotMessage, CityDropdown, BImage},
        props: ['botIconSource'],
        data: function () {
            return {
                city: '',
                time: '',
                userTime: '',
                timeDropdown: false,
                showCityDropdown: true,
                showTimeDropdown: false,
                todoButtons: false,
                details: false,
                endWeather: false,
                botCityMessage: false,
                botWeatherMessage: false,
                weatherData: '',

            }
        },
        mounted() {
            this.$root.$on('cityDropdownOnClick', (text) => {
                this.cityDropdownOnClick(text);
            });
            this.$root.$on('showWeather', (data) => {
                this.time = data[1];
                this.userTime = data[0];
                this.showWeather();
            });
            this.$root.$on('event', () => {
                this.endWeatherTalk();
            });
        },
        methods: {
            cityDropdownOnClick(value) {
                this.showCityDropdown = false;
                this.city = value;
                this.botCityMessage = true;
                this.showTimeDropdown = true;
                this.removeBotImage()
            },
            showWeather() {
                weatherService.getWeatherData(this.city, this.time).then((weatherData) => {
                    this.showTimeDropdown = false;
                    weatherData.city = this.city;
                    weatherData.time = this.time;
                    this.weatherData = weatherData;
                    this.botWeatherMessage = true;
                    this.todoButtons = true;
                    this.removeBotImage()
                });
            },
            endWeatherTalk() {
                this.removeBotImage();
                this.todoButtons = false;
                this.endTalk();
            },
            moreDetails() {
                this.todoButtons = false;
                this.details = true;
                this.removeBotImage();
                this.endTalk();
            },
            endTalk(){
                this.endWeather = true;
                this.$root.$emit("showCategories");
            },
            removeBotImage() {
                const array = document.getElementsByClassName('bot-image');
                array.item(array.length - 1).remove();
            }
        },

    }
</script>
<style scoped>
</style>
