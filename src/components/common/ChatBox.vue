<template>
    <div class="chat-box">
        <div class="chat-box-top-border"></div>
        <ul class="messages-list">
            <li class="message"
                v-for="(message, index) in messages"
                v-bind:key="index"
                v-bind:class="message.author" v-bind:data-with="message.author">
                <div v-if="message.style === 'default'"><a>{{message.text}}</a></div>
                <weather-message v-bind:data="message.data"
                                 v-else-if="message.style === 'weatherMessage'"></weather-message>
                <weather-details-message v-bind:data="message.data"
                                         v-else-if="message.style === 'weatherDetailsMessage'"></weather-details-message>
                <JokesMessage v-bind:data="message.data" v-else-if="message.style === 'jokesMessage'"></JokesMessage>
                <RestaurantMessage v-bind:data="message.data" v-else-if="message.style === 'restaurantMessage'" />
                <p v-if="index === lastBotMessageIndex">
                    <b-img class="bot-image" height="30" v-bind:src="botIconSource"></b-img>
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
            <Restaurants v-on:addMessage="addMessage($event)" :botIconSource="this.botIconSource"
                        v-if="activeCategory === 'restaurant'"/>
            <Fortune v-on:addMessage="addMessage($event)" :botIconSource="this.botIconSource"
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
        props: ["botIconSource"],
        data: function () {
            return {
                messages: [],
                activeCategory: null
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
            },
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
        border-bottom: var(--home-chat-box-border);
        border-left: var(--home-chat-box-border);
        border-right: var(--home-chat-box-border);
    }

    .chat-box-top-border {
        position: sticky;
        top: 202px;
        border-top: var(--home-chat-box-border);
        border-left: var(--home-chat-box-border);
        border-right: var(--home-chat-box-border);
        margin: 0 -42px;
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
        background: var(--chat-box-mesaage-bg-bot-color);
        color: white;
        display: inline-flex;
        border: var(--chat-box-meassage-border);
    }
    li.message[data-with="user"] > div {
        background: var(--chat-box-mesaage-bg-user-color);
    }


    .bot div {
        border-radius: 20px 20px 20px 0;
    }


    .user div {
        border-radius: 20px 20px 0 20px;
    }

    .user {
        text-align: right;
    }

    .chat-box {
        background: var(--chat-box-bg-color);
    }

    button {
        background: var(--chat-box-category-button-bg-color);
        color: var(--chat-box-category-button-text-color);
    }

    button:hover {
        text-shadow: var(--chat-box-category-button-hover-text-shadow);
        background: var(--chat-box-category-button-hover-bg-color);
        box-shadow: var(--chat-box-category-button-hover-box-shadow);
    }

</style>
