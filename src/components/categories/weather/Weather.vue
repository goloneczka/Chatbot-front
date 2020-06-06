<template>
    <div>
        <div id="weather-component">
            <CityDropdown v-on:cityDropdownOnClick="cityDropdownOnClick($event)" v-if="showCityDropdown"/>
            <TimeDropdown v-on:showWeatherMessage="showWeatherMessage($event)" v-if="showTimeDropdown"/>
            <div class="weather-buttons" v-if="endOrDetailsButtons">
                <b-button id="endWeatherTalkButton" v-bind:class="$store.getters.activeTheme.themeName"
                          class="m-2" v-on:click="this.endWeatherTalk">
                    {{$t('weather.user.thank')}}
                </b-button>
                <b-button id="moreDetailsButton" v-bind:class="$store.getters.activeTheme.themeName" class="m-2"
                          v-on:click="this.showMoreDetailsMessage">
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
                    myChoice: this.$t('user.myChoice'),
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
                this.$emit('addMessage', {author: "bot", text: this.messages.choiceTime, style: "default"});
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
                    this.$emit('addMessage', {
                        author: "user",
                        text: this.messages.myChoice + this.userTime,
                        style: "default"
                    });
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
                this.$emit('exitCategory');
            }
        },

    }
</script>
<style scoped>

    .weather-buttons {
        text-align: right;
    }

    button {
        border-radius: 1.0rem;
    }

    /deep/ button.light, /deep/ .light /deep/ button {
        background: var(--chat-button-light-theme-bg-color) !important;
        color: var(--chat-button-light-theme-text-color) !important;
        border: var(--button-border-style) var(--chat-button-light-theme-border-color) !important;
    }

    /deep/ button.light:hover, /deep/ .light /deep/ button:hover {
        background: var(--chat-button-hover-light-theme-bg-color) !important;
        color: var(--chat-button-hover-light-theme-text-color) !important;
        border: var(--button-border-style) var(--chat-button-hover-light-theme-border-color) !important;
    }

    /deep/ button.light:active, /deep/ .light /deep/ button:active {
        background: var(--chat-button-active-light-theme-bg-color) !important;
        color: var(--chat-button-active-light-theme-text-color) !important;
        border: var(--button-border-style) var(--chat-button-active-light-theme-border-color) !important;
        box-shadow: none !important;
    }

    /deep/ button.light:focus, /deep/ .light /deep/ button:focus {
        background: var(--chat-button-active-light-theme-bg-color) !important;
        color: var(--chat-button-active-light-theme-text-color) !important;
        border: var(--button-border-style) var(--chat-button-active-light-theme-border-color) !important;
        box-shadow: none !important;
    }

    /deep/ button.dark, /deep/ .dark /deep/ button {
        background: var(--chat-button-dark-theme-bg-color) !important;
        color: var(--chat-button-dark-theme-text-color) !important;
        border: var(--button-border-style) var(--chat-button-dark-theme-border-color) !important;
    }

    /deep/ button.dark:hover, /deep/ .dark /deep/ button:hover {
        background: var(--chat-button-hover-dark-theme-bg-color) !important;
        color: var(--chat-button-hover-dark-theme-text-color) !important;
        border: var(--button-border-style) var(--chat-button-hover-dark-theme-border-color) !important;
    }

    /deep/ button.dark:active, /deep/ .dark /deep/ button:active {
        background: var(--chat-button-active-dark-theme-bg-color) !important;
        color: var(--chat-button-active-dark-theme-text-color) !important;
        border: var(--button-border-style) var(--chat-button-active-dark-theme-border-color) !important;
        box-shadow: none !important;

    }

    /deep/ button.dark:focus, /deep/ .dark /deep/ button:focus {
        background: var(--chat-button-active-dark-theme-bg-color) !important;
        color: var(--chat-button-active-dark-theme-text-color) !important;
        border: var(--button-border-style) var(--chat-button-active-dark-theme-border-color) !important;
        box-shadow: none !important;
    }

    /deep/ button.blue, /deep/ .blue /deep/ button {
        background: var(--chat-button-blue-theme-bg-color) !important;
        color: var(--chat-button-blue-theme-text-color) !important;
        border: var(--button-border-style) var(--chat-button-blue-theme-border-color) !important;
    }

    /deep/ button.blue:hover, /deep/ .blue /deep/ button:hover {
        background: var(--chat-button-hover-blue-theme-bg-color) !important;
        color: var(--chat-button-hover-blue-theme-text-color) !important;
        border: var(--button-border-style) var(--chat-button-hover-blue-theme-border-color) !important;
    }

    /deep/ button.blue:active, /deep/ .blue /deep/ button:active {
        background: var(--chat-button-active-blue-theme-bg-color) !important;
        color: var(--chat-button-active-blue-theme-text-color) !important;
        border: var(--button-border-style) var(--chat-button-active-blue-theme-border-color) !important;
        box-shadow: none !important;
    }

    /deep/ button.blue:focus, /deep/ .blue /deep/ button:focus {
        background: var(--chat-button-active-blue-theme-bg-color) !important;
        color: var(--chat-button-active-blue-theme-text-color) !important;
        border: var(--button-border-style) var(--chat-button-active-blue-theme-border-color) !important;
        box-shadow: none !important;
    }

</style>
