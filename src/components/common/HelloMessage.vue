<template>
    <div class="hello-message">
        <div>
            <b-img height="100" v-bind:src="themeService.getActiveTheme().imageSource"></b-img>
            <bot-message v-bind:text="$t('bot.introductionMessage')"></bot-message>
        </div>
    </div>
</template>

<script>
    import BotMessage from "./BotMessage";
    import {themeService} from "../../App";

    export default {
        name: "HelloMessage",
        components: {BotMessage},
        data: function () {
            return {
                themeService
            }
        }

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
