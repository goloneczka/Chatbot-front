<template>
    <div>
        <ul>
            <li class="message">
                <div><a>{{this.text}}</a></div>
            </li>
        </ul>
    </div>
</template>
<script>

    export default {
        name: 'BotMessage',
        props: ['text'],
        components: {},
        data() {
            return {
            }
        },
        methods: {
        },

    }
</script>
<style scoped>
    .message > div {
        border-radius: var(--chat-box-message-bot-border-radius);
        margin: auto;
    }
</style>
