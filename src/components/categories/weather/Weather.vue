<template>
    <div>
        <div id="weather-component">
            <transition name="button-picker-slide">
            <CityDropdown v-on:cityDropdownOnClick="cityDropdownOnClick($event)" v-if="showCityDropdown"/>
            </transition>
            <transition name="button-picker-slide">
            <TimeDropdown v-on:showWeatherMessage="showWeatherMessage($event)" v-if="showTimeDropdown"/>
            </transition>
            <div class="weather-buttons" v-if="endOrDetailsButtons">
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
                }
            }
        },
        created() {
            this.sendMessage("user", this.$t('weather.user.choiceWeather'), "default").then(() => {
                this.sendMessage( "bot", this.$t('weather.bot.introduction'), "default").then(()=>{
                    this.showCityDropdown = true;
                })
            })
        },
        methods: {
            sendMessage(author, text, style = 'default') {
                return new Promise((resolve) => {
                    const basicMessage = {
                        author: author,
                        style: style,
                        resolve: resolve
                    };
                    let message;
                    if (style === 'default')
                        message = {
                            ...basicMessage,
                            text: text
                        }
                    else {
                        message = {
                            ...basicMessage,
                            data: text
                        }
                    }
                    this.$emit('addMessage', message);
                });
            },
            cityDropdownOnClick(value) {
                this.showCityDropdown = false;
                this.city = value;
                this.sendMessage("user", this.messages.chooseCity + value, "default").then(()=>{
                    this.sendMessage("bot", this.messages.choiceTime, "default").then(() => {
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
                    this.sendMessage( "user", this.messages.myChoice + this.userTime, "default").then(() =>{
                        this.sendMessage("bot", this.messages.myPredictions + this.city + this.messages.inMessage + this.userTime + '....', "default").then(() =>{
                            this.sendMessage( "bot", this.weatherData, "weatherMessage").then(() =>{
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
                this.sendMessage("user", this.$t('weather.user.moreDetails'), "default").then(() => {
                    this.sendMessage( "bot",  this.weatherData, "weatherDetailsMessage").then(() => {
                        this.endTalk();
                    })
                })
            },
            endTalk() {
                this.sendMessage("user", this.$t('weather.user.thank'), "default").then(() => {
                    this.sendMessage( "bot", this.$t('weather.bot.couldHelp'), "default").then(() => {
                        this.sendMessage( "bot",  this.$t('weather.bot.anythingToDo'), "default").then(() => {
                            this.showCityDropdown = true;
                            this.$emit('exitCategory');
                        })
                    })
                })
            }
        },

    }
</script>
<style scoped>
    @import "../../../../src/assets/buttonAnimate.css";
    .weather-buttons {
        text-align: right;
    }
</style>
