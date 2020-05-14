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
    import WeatherService from "./core/service/WeatherService";
    import RestaurantsService from "./core/service/RestaurantsService";
    import JokesService from "./core/service/JokesService";
    import Formatter from "./core/functions/Formatter";

    const baseUrl = process.env.VUE_APP_BASE_URL;

    export const authorizationStorage = new AuthorizationStorage();
    export const httpRequest = new HttpRequest(baseUrl, authorizationStorage);

    export const formatter = new Formatter();

    export const weatherService = new WeatherService(httpRequest);
    export const restaurantService = new RestaurantsService(httpRequest);
    export const jokesService = new JokesService(httpRequest);

    export default {
        name: 'App',
        components: {
            Dialog
        },

    }
</script>

