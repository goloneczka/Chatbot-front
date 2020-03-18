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

    const baseUrl = ''; //TODO ustawić baseUrl

    export const authorizationStorage = new AuthorizationStorage();
    export const httpRequest = new HttpRequest(baseUrl, authorizationStorage);

    export default {
        name: 'App',
        components: {
            Dialog
        }
    }
</script>

