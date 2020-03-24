<template>
        <Dialog/>
        <router-view/>
        <div id="app" v-bind:class="theme">
        <Home @selectedTheme="changeTheme($event)"/>

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
                theme: 'light'
            }
        },
        methods: {
            changeTheme: function (selectedTheme) {
                this.theme = selectedTheme;
            }

        }

    }
</script>
<style>

    html, body {
        height: 100%;
    }

    #app {
        min-height: 100%;
        font-family: "Source Sans Pro",serif;
    }

    #app.light {
        background: rgb(241, 241, 255);
    }

    #app.dark {
        background: rgb(26, 26, 53);
    }

</style>
