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
    import WeatherService from "./core/componentServices/WeatherService";

    const baseUrl = 'http://localhost:9090';

    export const authorizationStorage = new AuthorizationStorage();
    export const httpRequest = new HttpRequest(baseUrl, authorizationStorage);

    export const weatherService = new WeatherService();

    export default {
        name: 'App',
        components: {
            Dialog
        },

    }
</script>

