<template>
    <div class="home">
        <b-container>
            <b-row>
                <b-col cols="2"></b-col>
                <b-col cols="8">
                    <chat-box v-bind:bot-icon-source="botIconSource"></chat-box>
                </b-col>
                <b-col cols="2">
                    <b-img thumbnail center width="100%" class="logoImage" :src="require('../../assets/botLogo.png')"></b-img>
                </b-col>
            </b-row>
        </b-container>

        <!--<h1>{{ $t('home.title') }}</h1>
        <p>{{ $t('home.content') }}</p>-->
    </div>
</template>
<script>
    import ChatBox from "../ChatBox/ChatBox";

    export default {
        name: 'Home',
        components: {ChatBox},
        props: ["botIconSource"]

    }
</script>
<style>
    .chat-box {
        padding: 40px;
        padding-bottom: 60px;
        border: 2px solid black;
        border-radius: 15px;
    }

    .logoImage {
        position: fixed;
        top: 30%;
        display: block !important;
        margin-left: auto;
        margin-right: auto;
    }

    .container {
        max-width: 100% !important;
        margin: 0 !important;
    }

</style>
