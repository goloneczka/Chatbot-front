<template>
    <div>
        <div id="weather-component">
            <CityDropdown v-on:cityDropdownOnClick="cityDropdownOnClick($event)" v-if="showCityDropdown"/>
            <TimeDropdown v-on:showWeatherMessage="showWeatherMessage($event)" v-if="showTimeDropdown"/>
            <div v-if="endOrDetailsButtons">
                <b-button id="endWeatherTalkButton" class="m-2" v-on:click="this.endWeatherTalk">
                    {{$t('weather.user.thank')}}
                </b-button>
                <b-button id="moreDetailsButton" class="m-2" v-on:click="this.showMoreDetailsMessage">
                    {{$t('weather.user.moreDetails')}}
                </b-button>
            </div>
        </div>
    </div>
</template>
<script>

    import {weatherService} from "../../../App";

    import CityDropdown from "./models/CityDropdown";
    import TimeDropdown from "./models/TimeDropdown";

    export default {
        name: 'Weather',
        components: {TimeDropdown, CityDropdown},
        props: ['botIconSource'],
        data: function () {
            return {
                city: '',
                time: '',
                userTime: '',
                showCityDropdown: true,
                showTimeDropdown: false,
                endOrDetailsButtons: false,
                weatherData: '',
                messages: {
                    myChoice: this.$t('weather.user.myChoice'),
                    myPredictions: this.$t('weather.bot.myPredictions'),
                    inMessage: this.$t('weather.bot.in'),
                    chooseCity: this.$t('weather.user.chooseCity'),
                    choiceTime: this.$t('weather.bot.choiceTime')
                }
            }
        },
        created() {
            this.$emit('addMessage', {author: "user", text: this.$t('weather.user.choiceWeather'), style: "default"});
            this.$emit('addMessage', {author: "bot", text: this.$t('weather.bot.introduction'), style: "default"});
        },
        methods: {
            cityDropdownOnClick(value) {
                this.showCityDropdown = false;
                this.city = value;
                this.showTimeDropdown = true;
                this.$emit('addMessage', {
                    author: "user",
                    text: this.messages.chooseCity + value,
                    style: "default"
                });
                this.$emit('addMessage', {author: "bot", text: this.messages.choiceTime , style: "default"});
            },
            showWeatherMessage(data) {
                this.userTime = data[0];
                this.time = data[1];
                weatherService.getWeatherData(this.city, this.time).then((weatherData) => {
                    this.showTimeDropdown = false;
                    weatherData.city = this.city;
                    weatherData.time = this.time;
                    this.weatherData = weatherData;
                    this.endOrDetailsButtons = true;
                    this.$emit('addMessage', {author: "user", text: this.messages.myChoice + this.userTime, style: "default"});
                    this.$emit('addMessage', {
                        author: "bot",
                        text: this.messages.myPredictions + this.city + this.messages.inMessage + this.userTime + '....',
                        style: "default"
                    });
                    this.$emit('addMessage', {
                        author: "bot",
                        data: this.weatherData,
                        style: "weatherMessage"
                    });
                });
            },
            endWeatherTalk() {
                this.endOrDetailsButtons = false;
                this.endTalk();
            },
            showMoreDetailsMessage() {
                this.endOrDetailsButtons = false;
                this.$emit('addMessage', {author: "user", text: this.$t('weather.user.moreDetails'), style: "default"});
                this.$emit('addMessage', {author: "bot", data: this.weatherData, style: "weatherDetailsMessage"});
                this.endTalk();
            },
            endTalk() {
                this.$emit('addMessage', {author: "user", text: this.$t('weather.user.thank'), style: "default"});
                this.$emit('addMessage', {author: "bot", text: this.$t('weather.bot.couldHelp'), style: "default"});
                this.$emit('addMessage', {author: "bot", text: this.$t('weather.bot.anythingToDo'), style: "default"});
                this.showCityDropdown = true;
                this.$emit('exitWeather');

            }
        },

    }
</script>
<style scoped>
</style>
