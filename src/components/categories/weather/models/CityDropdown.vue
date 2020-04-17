<template>
    <div id="dropdown-button">
        <b-dropdown :text="$t('weather.user.city')" class="m-2">
            <b-dropdown-item v-for="city in cities" :key="city" v-on:click="cityDropdownOnClick(city)">{{city}}
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>
<script>

    import { weatherService } from './../../../../App'

    export default {
        name: 'CityDropdown',
        components: {},
        data() {
            return {
                cities: [],
            }
        },
        mounted() {
            Promise.resolve(weatherService.getAllCities()).then( data => this.cities = data);
        },
        methods: {
            cityDropdownOnClick(city) {
                this.$root.$emit('cityDropdownOnClick', city);
            }
        }
    }
</script>
<style scoped>
    #dropdown-button {
        margin-left: 85%;
    }
</style>
