<template>
<<<<<<< HEAD
    <div class="home" v-bind:class="themes[themeIndex].themeName">
=======
    <div class="home">
>>>>>>> cec5674f8f727165fdeb9edd7cc42f2e882cea57
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
                    <b-img thumbnail center width="100%" class="logoImage"
                           :src="require('../../assets/botLogo.png')"></b-img>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
    import ChatBox from "../ChatBox/ChatBox";

    export default {
        name: 'Home',
        components: {ChatBox},
<<<<<<< HEAD
=======
        props: ["theme"],
>>>>>>> cec5674f8f727165fdeb9edd7cc42f2e882cea57
        data: function () {
            return {
                themeIndex: 0,
                themes: []
            }
        },
        methods: {
            changeTheme: function (index) {
                this.themeIndex = index;
                for (let theme of this.themes) {
                    theme.activeTheme = false;
                }
                this.themes[index].activeTheme = true;
<<<<<<< HEAD
=======
                this.$emit('selectedTheme', this.themes[index].themeName)
>>>>>>> cec5674f8f727165fdeb9edd7cc42f2e882cea57
            }
        },
        created() {
            this.themes.push({
                themeName: "light",
                imageSource: "https://image.flaticon.com/icons/svg/1786/1786548.svg",
                activeTheme: true
            });
            this.themes.push({
                themeName: "dark",
                imageSource: "https://image.flaticon.com/icons/svg/2115/2115916.svg",
                activeTheme: false
            });
        }
<<<<<<< HEAD

=======
>>>>>>> cec5674f8f727165fdeb9edd7cc42f2e882cea57
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

    nav {
        background: rgb(104, 102, 99);
        border-bottom: 1px solid black;
        margin-bottom: 30px;
    }

    .nav-item {
        border-radius: 50%;
        margin: 5px;
        border: 2px solid rgb(104, 102, 99);
    }

    .nav-item[activeTheme=true] {
        border: 2px solid #d6dde4;
    }

    .nav-item:hover {
        background: aliceblue;
    }

    .home {
        padding-bottom: 30px;
        min-height: 100% !important;
        height: 100% !important;
    }

<<<<<<< HEAD
    .home.light {
        background: rgb(241, 241, 255);
    }

    .home.dark {
        background: rgb(26, 26, 53);
    }

=======
>>>>>>> cec5674f8f727165fdeb9edd7cc42f2e882cea57

</style>
