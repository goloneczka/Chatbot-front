<template>
    <div class="chat-box">
        <ul>
            <li class="message"
                v-for="(message, index) in messages"
                v-bind:key="index"
                v-bind:class="message.author"
            >
                <div><a>{{message.text}}</a></div>
                <p v-if="index === lastBotMessageIndex">
                    <b-img height="30" v-bind:src="botIconSource"></b-img>
                </p>
            </li>
        </ul>
        <b-button variant="outline-dark" v-on:click="onClick">Pogoda</b-button>
    </div>
</template>

<script>
    export default {
        name: "ChatBox",
        props: ["botIconSource"],
        data: function () {
            return {
                messages: [{author: "bot", text: "Witaj!"}, {author: "bot", text: "Co mogę dla Ciebie zrobić?"}]
            }
        },
        methods: {
            onClick: function () {
               /* this.messages.push({author: "user", text: "Witaj"});
                this.messages.push({author: "bot", text: "Witaj"});*/
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
            }
        }
    }
</script>

<style scoped>
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
        background: rgb(162, 197, 255);
        display: inline-flex;
        border: 1px solid black;
    }

    .bot {;
        text-align: left;
        margin-right: 30%;
    }

    .bot > div {
        border-radius: 20px 20px 20px 0;
    }

    .user {
        text-align: right;
        margin-left: 30%;
    }

    .user > div {
        border-radius: 20px 20px 0 20px;
    }

    .chat-box {
        background: rgba(255, 255, 255, 0.19);
    }

    button {
        float: right;
        background: #f6f7ff;
        color: black;
    }

    button:hover {
        text-shadow: 0 0 6px rgba(255, 255, 255, 1);
        background: rgb(26, 26, 53);
        box-shadow: 0 5px 40px -10px rgba(0, 0, 0, 0.60);
    }

</style>
