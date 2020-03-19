<template>

    <div id="app" v-bind:class="themes[themeIndex].themeName">
        <Dialog/>
        <router-view/>
    </div>
</template>

<script>

    import AuthorizationStorage from './core/requests/AuthorizationStorage';
    import HttpRequest from './core/requests/HttpRequest';
    import Dialog from "./components/common/Dialog";

    const baseUrl = 'http://localhost:8080';

    export const authorizationStorage = new AuthorizationStorage();
    export const httpRequest = new HttpRequest(baseUrl, authorizationStorage);


    export default {
        name: 'App',
        components: {
            Dialog
        },
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
    }
</script>
<style>

    html, body {
        height: 100%;
    }

    #app {
        min-height: 100%;
        font-family: "Source Sans Pro";
    }

    #app.light {
        background: rgb(241, 241, 255);
    }

    #app.dark {
        background: rgb(26, 26, 53);
    }

    nav {
        background: rgb(104, 102, 99);
        border-bottom: 1px solid black;
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
        margin-top: 30px;
        padding-bottom: 30px;
    }

</style>
