<template>
    <div class="admin-home">
        <nav class="navbar">
            <h1>{{ $t('adminHome.title')}}</h1>
            <div class="dropdown">
                <button class="dropbtn">{{ $t('adminHome.menu')}}</button>
                <div class="dropdown-content">
                    <a href="#">{{ $t('adminHome.users')}}</a>
                    <a href="#">{{ $t('adminHome.settings')}}</a>
                    <a href="#">{{ $t('adminHome.information')}}</a>
                    <a v-on:click="logOut">{{ $t('adminHome.logOut')}}</a>
                </div>
            </div>
        </nav>
        <div>
            <b-container class="bv-example-row">
                <b-row class="title">
                    <b-col class="categories-title">
                        <h1>{{ $t('adminHome.categories.title')}}</h1>
                    </b-col>
                </b-row>
                <b-row class="categories">
                    <b-col>
                        <b-card
                                :title="$t('adminHome.categories.weather')"
                                class="mb-2"
                        >
                            <b-button class="card-button" href="#">{{ $t('adminHome.categories.button')}}</b-button>
                        </b-card>
                    </b-col>
                    <b-col>
                        <b-card
                                :title="$t('adminHome.categories.jokes')"
                                class="mb-2"
                        >
                            <router-link :to="{ name: 'admin-jokes'}"><b-button class="card-button">{{ $t('adminHome.categories.button')}}</b-button></router-link>
                        </b-card>
                    </b-col>
                    <b-col>
                        <b-card
                                :title="$t('adminHome.categories.restaurant')"
                                class="mb-2"
                        >
                            <b-button class="card-button" href="#">{{ $t('adminHome.categories.button')}}</b-button>
                        </b-card>
                    </b-col>
                </b-row>
                <b-row class="categories">
                    <b-col>
                        <b-card
                                :title="$t('adminHome.categories.maps')"
                                class="mb-2"
                        >
                            <b-button class="card-button" href="#">{{ $t('adminHome.categories.button')}}</b-button>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </div>

    </div>
</template>
<script>

    import AuthorizationStorage from "../../core/requests/AuthorizationStorage";
    import {routesNames} from "../../routes";

    const authorizationStorage = new AuthorizationStorage();

    export default {
        name: 'AdminHome',

        methods: {
            logOut() {
                authorizationStorage.removeAuthorization();
                this.$router.replace(routesNames.adminLogin)
            }
        }
    }
</script>
<style scoped>
    .navbar {
        background: var(--main-bg-color);
        color: var(--main-txt-color);
        box-shadow: var(--main-box-shadow);
        text-align: center;
    }

    .dropbtn {
        background-color: var(--main-bg-color);
        color: white;
        padding-right: 140px;
        font-size: var(--main-big-font-size);
        border: none;
        cursor: pointer;
    }

    .dropdown {
        position: relative;
        display: inline-block;
    }

    .dropdown-content {
        display: none;
        position: fixed;
        background-color: #f9f9f9;
        min-width: 240px;
        font-size: var(--main-medium-font-size);
        box-shadow: var(--main-box-shadow);
        z-index: 1;
    }

    .dropdown-content a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }

    .dropdown-content a:hover {
        background-color: var(--main-secound-bg-color);
        color: var(--main-txt-color)
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }

    .card-button {
        background: var(--main-bg-color);
    }

    .card-button:hover {
        background: gray;
    }

    .mb-2 {
        box-shadow: var(--main-box-shadow);
        border: black;
        max-width: var(--main-max-width-admin-home)
    }

    .title, .categories {
        background: var(--main-bg-color);
        padding: var(--main-min-padding-margin);
    }

    .categories-title {
        margin: var(--main-min-padding-margin);
        padding: var(--main-min-padding-margin);
        color: var(--main-txt-color);
    }

</style>
