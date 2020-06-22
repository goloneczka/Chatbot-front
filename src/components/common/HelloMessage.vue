<template>
    <div class="hello-message">
        <div>
            <b-img class="image" height="100" :src="require('../../assets/robotIcon.svg')"></b-img>
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
        margin-bottom: 1%;
        text-align: center;
    }

    .hello-message div {
        display: inline-flex;
    }

    .image {
        margin-right: 2%;
    }

</style>
