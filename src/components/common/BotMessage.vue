<template>
    <div>
        <ul>
            <li class="message">
                <div v-bind:class="$store.getters.activeTheme.themeName">{{this.text}}</div>
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

    .message > div.light {
        background: var(--bot-hello-message-light-theme-bg-color);
        color: var(--bot-hello-message-light-theme-text-color);
    }

    .message > div.dark {
        background: var(--bot-hello-message-dark-theme-bg-color);
        color: var(--bot-hello-message-dark-theme-text-color);
    }

    .message > div.blue {
        background: var(--bot-hello-message-blue-theme-bg-color);
        color: var(--bot-hello-message-blue-theme-text-color);
    }

</style>
