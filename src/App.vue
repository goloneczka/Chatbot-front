<template>
    <div id="app">
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

    }
</script>
<style>

    html, body {
        height: 100%;
    }

    #app {
        min-height: 100%;
        height: 100%;
        font-family: "Source Sans Pro",serif;
    }


</style>
