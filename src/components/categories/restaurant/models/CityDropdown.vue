<template>
    <div id="dropdown-button">
        <b-dropdown :text="$t('user.city')" class="m-2"
                    v-bind:class="$store.getters.activeTheme.themeName">
            <b-dropdown-item v-for="city in cities" :key="city.id" v-on:click="cityDropdownOnClick(city)">{{city.city}}
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>
<script>

    import {restaurantService} from '../../../../App'

    export default {
        name: 'CityDropdown',
        components: {},
        data() {
            return {
                cities: [],
            }
        },
        mounted() {
            restaurantService.getAllCities().then( data => {
                if (data.errors)
                    this.$root.$emit("showDanger",this.$t('food.errors.errorListOfCities') + data.errors[0]);
                else
                    this.cities = data
            });
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
        margin-left: 85%;
    }
</style>
