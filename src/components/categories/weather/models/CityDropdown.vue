<template>
    <div id="dropdown-button">
        <b-dropdown v-bind:class="$store.getters.activeTheme.themeName" :text="$t('user.city')" class="m-2">
            <b-dropdown-item v-for="city in cities" :key="city" v-on:click="cityDropdownOnClick(city)">{{city}}
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>
<script>

    import { weatherService } from '../../../../App'

    export default {
        name: 'CityDropdown',
        components: {},
        data() {
            return {
                cities: [],
            }
        },
        created() {
            weatherService.getAllCities().then( data => this.cities = data);
        },
        methods: {
            cityDropdownOnClick(city) {
                this.$emit('cityDropdownOnClick', city);
            }
        }
    }
</script>
<style scoped>
    #dropdown-button {
        text-align: right;
    }
    /deep/ button {
        border-radius: 1.0rem;
    }
</style>
