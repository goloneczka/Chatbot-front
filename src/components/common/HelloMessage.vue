<template>
    <div class="hello-message">
        <div>
            <b-img height="100" v-bind:src="$store.getters.activeTheme.imageSource"></b-img>
            <bot-message v-bind:text="$t('bot.introductionMessage')"></bot-message>
        </div>
    </div>
</template>

<script>
    import BotMessage from "./BotMessage";

    export default {
        name: "HelloMessage",
        components: {BotMessage},

    }
</script>

<style scoped>

    .hello-message {
        margin-top: 15px;
        text-align: center;
    }

    .hello-message div {
        display: inline-flex;
    }

</style>
