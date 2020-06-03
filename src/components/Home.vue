<template>
    <div class="home" v-bind:class="$store.getters.activeTheme.themeName">

        <b-navbar v-bind:class="$store.getters.activeTheme.themeName">
            <b-navbar-brand>
                <b-img thumbnail center width="65" class="logo-image"
                       :src="require('../assets/app_logo.png')"></b-img>
            </b-navbar-brand>
            <b-navbar-nav class="ml-auto">
                <b-nav-item v-for="(theme, index) in $store.getters.allThemes" :key="index" v-bind:activeTheme="theme.isActiveTheme"
                            v-on:click="changeTheme(index)" v-bind:class="$store.getters.activeTheme.themeName">
                    <b-img height="40" v-bind:src="theme.imageSource"></b-img>
                </b-nav-item>
            </b-navbar-nav>
        </b-navbar>

        <b-container>
            <b-row v-bind:class="$store.getters.activeTheme.themeName" class="category-panel">
                <b-col cols="1"/>
                <b-col>
                    <hello-message></hello-message>
                    <categories-chooser v-on:activeChatBox="activeChatBox"/>
                </b-col>
                <b-col cols="1"/>
            </b-row>

            <b-row v-show="isChatBoxActive">
                <b-col cols="2"></b-col>
                <b-col cols="8">
                    <chat-box></chat-box>
                </b-col>
                <b-col cols="2">
                </b-col>
            </b-row>
        </b-container>

    </div>
</template>
<script>
    import ChatBox from "./common/ChatBox";
    import CategoriesChooser from "./common/CategoriesChooser";
    import HelloMessage from "./common/HelloMessage";

    export default {
        name: 'Home',
        components: {HelloMessage, CategoriesChooser, ChatBox},
        data: function () {
            return {
                isChatBoxActive: false
            }
        },
        methods: {
            changeTheme: function (index) {
                this.$store.commit('changeTheme',{themeIndex: index});
            },
            activeChatBox: function () {
                this.isChatBoxActive = true;
            }
        }
    }
</script>

<style scoped>

    .container {
        max-width: 100% !important;
        margin: 0 !important;
    }

    .logo-image {
        padding: 0;
        border: none;
    }

    nav {
        border-bottom: var(--home-nav-border);
        margin-bottom: 30px;
    }

    nav.light {
        background: var(--home-nav-light-theme-bg-color);
    }

    nav.dark {
        background: var(--home-nav-dark-theme-bg-color);
    }

    nav.blue {
        background: var(--home-nav-blue-theme-bg-color);
    }

    .nav-item {
        border-radius: 50%;
        margin: 5px;
        border: var(--home-nav-item-border) transparent;

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

    .home.blue {
        background: var(--home-blue-theme-bg-color);
    }

    .category-panel {
        position: sticky;
        top: 0;
        z-index: 1020;
        max-height: 202px;
    }

    .category-panel.light {
        background: var(--home-light-theme-bg-color);
    }

    .category-panel.dark {
        background: var(--home-dark-theme-bg-color);
    }

    .category-panel.blue {
        background: var(--home-blue-theme-bg-color);
    }

</style>
