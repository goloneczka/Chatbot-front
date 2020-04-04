<template>
    <div class="chat-box">
        <ul class="messages-list">
            <li class="message"
                v-for="(message, index) in messages"
                v-bind:key="index"
                v-bind:class="message.author"
            >
                <div><a>{{message.text}}</a></div>
                <p v-if="index === lastBotMessageIndex">
                    <b-img class="bot-image" height="30" v-bind:src="botIconSource"></b-img>
                </p>
                <p v-else-if="index === lastUserMessageIndex">
                    <b-img class="bot-image" height="30" :src="require('../../assets/user_icon.png')"></b-img>
                </p>
            </li>
        </ul>
        <b-button id="chooseCategoryButton" class="m-2" v-on:click="onClick">{{$t('bot.categoryWeather')}}
        </b-button>
        <div id="categoryComponent">
            <Weather :botIconSource="this.botIconSource" v-if="weather" />
        </div>
    </div>
</template>

<script>

    import Weather from "../categories/weather/Weather";

    export default {
        name: "ChatBox",
        components: {Weather},
        props: ["botIconSource"],
        data: function () {
            return {
                messages: [{author: "bot", text: this.$t('bot.helloMessage')},
                    {author: "bot", text: this.$t('bot.introductionMessage')},
                    {author: "bot", text: this.$t('bot.chooseCategoryMessage')}
                ],
                weather: false,
            }
        },
        methods: {
            onClick: function () {
                this.weather = true;
                document.getElementById("chooseCategoryButton").remove();
                document.getElementsByClassName('bot-image').item(0).remove();
            }
        },
        updated() {
            this.$nextTick(() => {
                window.scrollTo(0, document.body.scrollHeight)
            })

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
        }
    }
</script>

<style>
    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        word-break: break-word;
    }

    li > div {
        padding: 10px;
    }

    li > div {
        margin-bottom: 20px;
        background: var(--chat-box-mesaage-bg-color);
        color: white;
        display: inline-flex;
        border: var(--chat-box-meassage-border);
    }


    .bot > div {
        border-radius: 20px 20px 20px 0;
    }


    .user > div {
        border-radius: 20px 20px 0 20px;
    }

    .chat-box {
        background: var(--chat-box-bg-color);
    }

    button {
        float: right;
        background: var(--chat-box-category-button-bg-color);
        color: var(--chat-box-category-button-text-color);
    }

    button:hover {
        text-shadow: var(--chat-box-category-button-hover-text-shadow);
        background: var(--chat-box-category-button-hover-bg-color);
        box-shadow: var(--chat-box-category-button-hover-box-shadow);
    }

</style>
