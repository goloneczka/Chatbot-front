<template>
    <div class="admin-home">
        <nav class="navbar">
            <h1>{{ $t('adminHome.navbar')}}</h1>
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
                                style="max-width: 20rem;"
                                class="mb-2"
                        >
                            <b-button class="card-button" href="#">{{ $t('adminHome.categories.button')}}</b-button>
                        </b-card>
                    </b-col>
                    <b-col>
                        <b-card
                                :title="$t('adminHome.categories.jokes')"
                                style="max-width: 20rem;"
                                class="mb-2"
                        >

                            <b-button class="card-button" href="#">{{ $t('adminHome.categories.button')}}</b-button>
                        </b-card>
                    </b-col>
                    <b-col>
                        <b-card
                                :title="$t('adminHome.categories.restaurant')"
                                style="max-width: 20rem;"
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
                                style="max-width: 20rem;"
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
    import '../common/css/styles.css'

    const authorizationStorage = new AuthorizationStorage();

    export default {
        name: 'AdminHome',

        methods: {
            logOut() {
                authorizationStorage.removeAuthorization();
                this.$router.push(routesNames.adminLogin)
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
        font-size: 36px;
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
        font-size: 20px;
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
        background-color: gray;
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
    }

    .title, .categories {
        background: var(--main-bg-color);
        padding: 15px;
    }

    .categories-title {
        margin: 15px;
        padding: 15px;
        color: var(--main-txt-color);
    }

</style>
