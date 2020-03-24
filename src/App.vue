<template>
<<<<<<< HEAD
    <div id="app">
        <Dialog/>
        <router-view/>
=======
    <div id="app" v-bind:class="theme">
        <Home @selectedTheme="changeTheme($event)"/>
>>>>>>> cec5674f8f727165fdeb9edd7cc42f2e882cea57
    </div>
</template>

<script>
<<<<<<< HEAD

    import AuthorizationStorage from './core/requests/AuthorizationStorage';
    import HttpRequest from './core/requests/HttpRequest';
    import Dialog from "./components/common/Dialog";

    const baseUrl = 'http://localhost:8080';

    export const authorizationStorage = new AuthorizationStorage();
    export const httpRequest = new HttpRequest(baseUrl, authorizationStorage);

=======
    import Home from './components/home/Home.vue'
>>>>>>> cec5674f8f727165fdeb9edd7cc42f2e882cea57

    export default {
        name: 'App',
        components: {
<<<<<<< HEAD
            Dialog
        },
=======
            Home
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
>>>>>>> cec5674f8f727165fdeb9edd7cc42f2e882cea57

    }
</script>
<style>

    html, body {
        height: 100%;
    }

    #app {
        min-height: 100%;
<<<<<<< HEAD
        height: 100%;
        font-family: "Source Sans Pro",serif;
    }

=======
        font-family: "Source Sans Pro",serif;
    }

    #app.light {
        background: rgb(241, 241, 255);
    }

    #app.dark {
        background: rgb(26, 26, 53);
    }
>>>>>>> cec5674f8f727165fdeb9edd7cc42f2e882cea57

</style>
