<template>
    <div>
        <div id="weather-component">
            <transition name="button-dropdown-slide">
                <CityDropdown v-on:cityDropdownOnClick="cityDropdownOnClick($event)" v-if="showCityDropdown"/>
            </transition>
            <transition name="button-dropdown-slide">
                <TimeDropdown v-on:showWeatherMessage="showWeatherMessage($event)" v-if="showTimeDropdown"/>
            </transition>
            <transition name="button-picker-slide" @after-enter="disabled=false">
                <div class="weather-buttons" v-if="endOrDetailsButtons">
                    <b-button :disabled="disabled" id="endWeatherTalkButton"
                              v-bind:class="themeService.getActiveTheme().themeName"
                              class="m-2" v-on:click="disableButtons(endWeatherTalk)">
                        {{$t('weather.user.thank')}}
                    </b-button>
                    <b-button id="moreDetailsButton" :disabled="disabled"
                              v-bind:class="themeService.getActiveTheme().themeName" class="m-2"
                              v-on:click="disableButtons(showMoreDetailsMessage)">
                        {{$t('weather.user.moreDetails')}}
                    </b-button>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>

    import {weatherService} from "../../../App";
    import {themeService} from "../../../App";
    import {sendMessage} from "../../common/messages"
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
                showCityDropdown: false,
                showTimeDropdown: false,
                endOrDetailsButtons: false,
                weatherData: '',
                messages: {
                    myChoice: this.$t('user.myChoice'),
                    myPredictions: this.$t('weather.bot.myPredictions'),
                    inMessage: this.$t('weather.bot.in'),
                    chooseCity: this.$t('weather.user.chooseCity'),
                    choiceTime: this.$t('weather.bot.choiceTime')
                },
                themeService,
                disabled: false
            }
        },
        created() {
            sendMessage(this, "user", this.$t('weather.user.choiceWeather')).then(() => {
                sendMessage(this, "bot", this.$t('weather.bot.introduction')).then(() => {
                    this.showCityDropdown = true;
                })
            })
        },
        methods: {
            cityDropdownOnClick(value) {
                this.showCityDropdown = false;
                this.city = value;
                sendMessage(this, "user", this.messages.chooseCity + value).then(() => {
                    sendMessage(this, "bot", this.messages.choiceTime).then(() => {
                        this.showTimeDropdown = true;
                    })
                })
            },
            showWeatherMessage(data) {
                this.userTime = data[0];
                this.time = data[1];
                weatherService.getWeatherData(this.city, this.time).then((weatherData) => {
                    this.showTimeDropdown = false;
                    weatherData.city = this.city;
                    weatherData.time = this.time;
                    this.weatherData = weatherData;
                    sendMessage(this, "user", this.messages.myChoice + this.userTime).then(() => {
                        sendMessage(this, "bot", this.messages.myPredictions + this.city + this.messages.inMessage + this.userTime + '....').then(() => {
                            sendMessage(this, "bot", this.weatherData, "weatherMessage").then(() => {
                                this.endOrDetailsButtons = true;
                            })
                        })
                    })
                });
            },
            endWeatherTalk() {
                this.endOrDetailsButtons = false;
                this.endTalk();
            },
            showMoreDetailsMessage() {
                this.endOrDetailsButtons = false;
                sendMessage(this, "user", this.$t('weather.user.moreDetails')).then(() => {
                    sendMessage(this, "bot", this.weatherData, "weatherDetailsMessage").then(() => {
                        this.endTalk();
                    })
                })
            },
            endTalk() {
                sendMessage(this, "user", this.$t('weather.user.thank')).then(() => {
                    sendMessage(this, "bot", this.$t('weather.bot.couldHelp')).then(() => {
                        sendMessage(this, "bot", this.$t('weather.bot.anythingToDo')).then(() => {
                            this.showCityDropdown = true;
                            this.$emit('exitCategory');
                        })
                    })
                })
            },
            disableButtons(afterDisableFunction) {
                this.disabled = true;
                this.$nextTick(() => {
                    afterDisableFunction();
                })
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

</style>
