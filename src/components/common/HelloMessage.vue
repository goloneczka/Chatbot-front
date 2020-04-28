<template>
    <div class="hello-message">
        <div>
            <b-img height="100" v-bind:src="botIconSource"></b-img>
            <bot-message v-bind:text="$t('bot.introductionMessage')"></bot-message>
        </div>
    </div>
</template>

<script>
    import BotMessage from "./BotMessage";

    export default {
        name: "HelloMessage",
        props: ["botIconSource"],
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
