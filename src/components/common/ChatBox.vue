<template>
    <div class="chat-box" v-bind:class="themeService.getActiveTheme().themeName">
        <div class="chat-box-top-border" v-bind:class="themeService.getActiveTheme().themeName"></div>
        <ul class="messages-list">
            <li class="message"
                v-for="(message, index) in messages"
                v-bind:key="index"
                v-bind:class="[message.author, themeService.getActiveTheme().themeName]"
                v-bind:data-with="message.author">
                <div v-if="message.style === 'default'"><a>{{message.text}}</a></div>
                <weather-message v-bind:data="message.data"
                                 v-else-if="message.style === 'weatherMessage'"></weather-message>
                <weather-details-message v-bind:data="message.data"
                                         v-else-if="message.style === 'weatherDetailsMessage'"></weather-details-message>
                <JokesMessage v-bind:data="message.data" v-else-if="message.style === 'jokesMessage'"></JokesMessage>
                <RestaurantMessage v-bind:data="message.data" v-else-if="message.style === 'restaurantMessage'"/>
                <p v-if="index === lastBotMessageIndex">
                    <b-img class="bot-image" height="30" v-bind:src="themeService.getActiveTheme().imageSource"></b-img>
                </p>
                <p v-else-if="index === lastUserMessageIndex">
                    <b-img class="bot-image" height="30" :src="require('../../assets/user_icon.png')"></b-img>
                </p>
            </li>
        </ul>
        <div id="categoryComponent">
            <Weather v-on:addMessage="addMessage($event)" v-if="activeCategory === 'weather'"
                     v-on:exitCategory="changeCategory(null)"/>
            <Jokes v-on:addMessage="addMessage($event)" v-if="activeCategory === 'jokes'"></Jokes>
            <Restaurants v-on:addMessage="addMessage($event)" :botIconSource="themeService.getActiveTheme().imageSource"
                         v-if="activeCategory === 'restaurant'"/>
            <Fortune v-on:addMessage="addMessage($event)" :botIconSource="themeService.getActiveTheme().imageSource"
                   v-if="activeCategory === 'fortune'" />

        </div>
    </div>
</template>

<script>

    import Weather from "../categories/weather/Weather";
    import WeatherMessage from "../categories/weather/models/WeatherMessage";
    import WeatherDetailsMessage from "../categories/weather/models/WeatherDetailsMessage";
    import Jokes from "../categories/jokes/Jokes";
    import JokesMessage from "../categories/jokes/JokesMessage";
    import Restaurants from "../categories/restaurant/Restaurants";
    import RestaurantMessage from "../categories/restaurant/models/RestaurantMessage";
    import Fortune from "../categories/money/Fortune";

    import {themeService} from "../../App";

    export default {
        name: "ChatBox",
        components: {
            RestaurantMessage,
            Restaurants,
            JokesMessage,
            Jokes,
            WeatherDetailsMessage,
            WeatherMessage,
            Weather,
            Fortune
        },
        data: function () {
            return {
                messages: [],
                activeCategory: null,
                themeService
            }
        },
        methods: {
            addMessage: function (message) {
                this.messages.push(message);
                this.scrollDown();
            },
            changeCategory: function (category) {
                this.activeCategory = null;
                this.$nextTick(() => {
                    this.activeCategory = category;
                });
            },
            scrollDown: function () {
                this.$nextTick(() => {
                    window.scrollBy({top: document.body.scrollHeight, behavior: 'smooth'});
                })
            }
        },
        computed: {
            lastBotMessageIndex: function () {
                let index = this.messages.length - 1;
                for (; index >= 0; index--) {
                    if (this.messages[index].author === "bot") {
                        return index;
                    }
                }
                return index;
            },
            lastUserMessageIndex: function () {
                let index = this.messages.length - 1;
                for (; index >= 0; index--) {
                    if (this.messages[index].author === "user") {
                        return index;
                    }
                }
                return null;
            }
        },
        mounted() {
            this.$root.$on('activeCategory', (category) => {
                this.changeCategory(category)
            })
        }
    }
</script>

<style>

    .chat-box {
        padding: 0 40px 60px;
    }

    .chat-box-top-border {
        position: sticky;
        top: 202px;
        margin: 0 -41px;
        height: 60px;
    }

    .messages-list {
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        word-break: break-word;
    }

    li > div {
        padding: 10px;
        margin-bottom: 20px;
        display: inline-flex;
    }

    .bot div {
        border-radius: 20px 20px 20px 0;
    }

    .bot.light div {
        background: var(--chat-box-mesaage-light-theme-bg-bot-color);
        color: var(--chat-box-mesaage-light-theme-text-bot-color);
    }

    .bot.dark div {
        background: var(--chat-box-mesaage-dark-theme-bg-bot-color);
        color: var(--chat-box-mesaage-dark-theme-text-bot-color);
    }

    .bot.blue div {
        background: var(--chat-box-mesaage-blue-theme-bg-bot-color);
        color: var(--chat-box-mesaage-blue-theme-text-bot-color);
    }

    .user div {
        border-radius: 20px 20px 0 20px;
    }

    .user.light div {
        background: var(--chat-box-mesaage-light-theme-bg-user-color);
        color: var(--chat-box-mesaage-light-theme-text-user-color);
    }

    .user.dark div {
        background: var(--chat-box-mesaage-dark-theme-bg-user-color);
        color: var(--chat-box-mesaage-dark-theme-text-user-color);
    }

    .user.blue div {
        background: var(--chat-box-mesaage-blue-theme-bg-user-color);
        color: var(--chat-box-mesaage-blue-theme-text-user-color);
    }

    .user {
        text-align: right;
    }

    .chat-box.light {
        background: var(--chat-box-light-theme-bg-color);
        border-bottom: var(--home-chat-box-border) var(--home-chat-box-light-theme-border-color);
        border-left: var(--home-chat-box-border) var(--home-chat-box-light-theme-border-color);
        border-right: var(--home-chat-box-border) var(--home-chat-box-light-theme-border-color);
    }

    .chat-box.dark {
        background: var(--chat-box-dark-theme-bg-color);
        border-bottom: var(--home-chat-box-border) var(--home-chat-box-dark-theme-border-color);
        border-left: var(--home-chat-box-border) var(--home-chat-box-dark-theme-border-color);
        border-right: var(--home-chat-box-border) var(--home-chat-box-dark-theme-border-color);
    }

    .chat-box.blue {
        background: var(--chat-box-blue-theme-bg-color);
        border-bottom: var(--home-chat-box-border) var(--home-chat-box-blue-theme-border-color);
        border-left: var(--home-chat-box-border) var(--home-chat-box-blue-theme-border-color);
        border-right: var(--home-chat-box-border) var(--home-chat-box-blue-theme-border-color);
        border-image-source: var(--home-nav-blue-theme-bg-color);
        border-image-slice: 5;
    }

    .chat-box-top-border.light {
        border-top: var(--home-chat-box-border) var(--home-chat-box-light-theme-border-color);
        border-left: var(--home-chat-box-border) var(--home-chat-box-light-theme-border-color);
        border-right: var(--home-chat-box-border) var(--home-chat-box-light-theme-border-color);
    }

    .chat-box-top-border.dark {
        border-top: var(--home-chat-box-border) var(--home-chat-box-dark-theme-border-color);
        border-left: var(--home-chat-box-border) var(--home-chat-box-dark-theme-border-color);
        border-right: var(--home-chat-box-border) var(--home-chat-box-dark-theme-border-color);
    }

    .chat-box-top-border.blue {
        border-top: var(--home-chat-box-border) var(--home-chat-box-blue-theme-border-color);
        border-left: var(--home-chat-box-border) var(--home-chat-box-blue-theme-border-color);
        border-right: var(--home-chat-box-border) var(--home-chat-box-blue-theme-border-color);
        border-image-source: var(--home-nav-blue-theme-bg-color);
        border-image-slice: 5;
    }


</style>
