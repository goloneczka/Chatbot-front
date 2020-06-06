<template>
    <div class="chat-box">
        <div class="chat-box-top-border"></div>
        <ul class="messages-list">
            <li class="message"
                v-for="(message, index) in messages"
                v-bind:key="index"
                v-bind:class="message.author">
                <div v-if="message.style === 'default'"><a>{{message.text}}</a></div>
                <weather-message v-bind:data="message.data"
                                 v-else-if="message.style === 'weatherMessage'"></weather-message>
                <weather-details-message v-bind:data="message.data"
                                         v-else-if="message.style === 'weatherDetailsMessage'"></weather-details-message>
                <JokesMessage v-bind:data="message.data"
                              v-else-if="message.style === 'jokesMessage'"></JokesMessage>
                <RestaurantMessage v-bind:data="message.data" v-else-if="message.style === 'restaurantMessage'"/>
                <ChatBoxAnimation class="animate-bot-message" v-bind:data-with="message.author"
                                      v-if="index === lastMessageIndex && messageAnimate" />
                <p v-if="index === lastUserMessageIndex">
                    <b-img class="bot-image" height="30" :src="require('../../assets/user_icon.png')"></b-img>
                </p>
                <p v-else-if="index === lastBotMessageIndex">
                    <b-img class="bot-image" height="30" v-bind:src="botIconSource"></b-img>
                </p>


            </li>
        </ul>
        <div id="categoryComponent">
            <Weather v-on:addMessage="addMessage($event)" v-if="activeCategory === 'weather'"
                     v-on:exitCategory="changeCategory(null)"/>
            <Jokes v-on:addMessage="addMessage($event)" v-if="activeCategory === 'jokes'"></Jokes>
            <Restaurants v-on:addMessage="addMessage($event)" v-if="activeCategory === 'restaurant'"/>
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
    import ChatBoxAnimation from "./ChatBoxAnimation";

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
            ChatBoxAnimation
        },
        props: ["botIconSource"],
        data: function () {
            return {
                messages: [],
                activeCategory: null,
                messageAnimate: false
            }
        },
        methods: {
            addMessage: function (message) {
                console.log(message)
                this.messageAnimate = true;
                this.messages.push({author: message.author})
                this.$nextTick(() => {
                    new Promise((resolve) => {
                        this.$root.$emit('messageAnimate', resolve);
                    }).then(() => {
                        this.modifyLastMessage(message);
                        this.$root.$emit('scrollAnimate');
                        message.resolve();
                        this.messageAnimate = false;
                    })
                });
            },
            changeCategory: function (category) {
                this.activeCategory = null;
                this.$nextTick(() => {
                    this.activeCategory = category;
                });
            },
            modifyLastMessage: function (message) {
                this.messages.pop();
                this.messages.push(message);
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
                return 0;
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
            lastMessageIndex: function () {
                return this.messages.length - 1;
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
        background: var(--chat-box-mesaage-bg-color);
        color: white;
        display: inline-flex;
        border: var(--chat-box-meassage-border);
    }

    .animate-bot-message {
        padding: 10px;
        margin-bottom: 15px;
        background: var(--chat-box-mesaage-bg-color);
        color: white;
        display: block;
        max-width: 70px;
        border: var(--chat-box-meassage-border);
    }
    .animate-bot-message[data-with="user"] {
        margin-right:auto;
        margin-left:0;
        padding: 10px;
        margin-bottom: 15px;
        background: var(--chat-box-mesaage-bg-color);
        color: white;
        display: inline-block;
        border: var(--chat-box-meassage-border);
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
