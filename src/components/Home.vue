<template>
    <div class="home" v-bind:class="themes[themeIndex].themeName">
        <b-navbar sticky>
            <b-navbar-nav>
                <b-nav-item v-for="(theme, index) in themes" :key="index" v-bind:activeTheme="theme.activeTheme"
                            v-on:click="changeTheme(index)">
                    <b-img height="50" v-bind:src="theme.imageSource"></b-img>
                </b-nav-item>
            </b-navbar-nav>
        </b-navbar>
        <b-container>
            <b-row>
                <b-col cols="2"></b-col>
                <b-col cols="8">
                    <chat-box v-bind:bot-icon-source="themes[themeIndex].imageSource"></chat-box>
                </b-col>
                <b-col cols="2">
                    <b-img thumbnail center width="100%" class="logo-image"
                           :src="require('../assets/botLogo.png')"></b-img>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
    import ChatBox from "./common/ChatBox";

    export default {
        name: 'Home',
        components: {ChatBox},
        data: function () {
            return {
                themeIndex: 0,
                themes: [{
                    themeName: "light",
                    imageSource: require('../assets/light_bot.png'),
                    activeTheme: true
                }, {
                    themeName: "dark",
                    imageSource: require('../assets/dark_bot.png'),
                    activeTheme: false
                }
                ]
            }
        },
        methods: {
            changeTheme: function (index) {
                this.themeIndex = index;
                for (let theme of this.themes) {
                    theme.activeTheme = false;
                }
                this.themes[index].activeTheme = true;
            }
        }
    }
</script>
<style>
    .chat-box {
        padding: 40px 40px 60px;
        border: var(--home-chat-box-border);
        border-radius: 15px;
    }

    .logo-image {
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

    nav {
        background: var(--home-nav-bg-color);
        border-bottom: var(--home-nav-border);
        margin-bottom: 30px;
    }

    .nav-item {
        border-radius: 50%;
        margin: 5px;
        border: var(--home-nav-item-border) var(--home-nav-bg-color);

    }

    .nav-item[activeTheme=true] {
        border: var(--home-nav-item-border) var(--home-nav-item-active-border-color);
    }

    .nav-item:hover {
        background: var(--home-nav-item-hover-bg-color);
    }

    .home {
        padding-bottom: 30px;
        min-height: 100% !important;
    }

    .home.light {
        background: var(--home-light-theme-bg-color);
    }

    .home.dark {
        background: var(--home-dark-theme-bg-color);
    }

</style>
