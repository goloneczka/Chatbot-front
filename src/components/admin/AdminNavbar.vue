<template>
    <div class="admin-home">
        <nav class="navbar">
            <h1>{{ $t('adminHome.title')}}</h1>
            <div class="dropdown">
                <button class="dropbtn">{{ $t('adminHome.menu')}}</button>
                <div class="dropdown-content">
                    <a v-on:click="logOut">{{ $t('adminHome.logOut')}}</a>
                </div>
            </div>
        </nav>
    </div>
</template>
<script>
    import { authorizationStorage } from "../../App";
    import {routesNames} from "../../routes";
    export default {
        name: 'AdminNavbar',
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
</style>
