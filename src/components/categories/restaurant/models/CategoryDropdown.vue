<template>
    <div id="dropdown-button">
        <b-dropdown :text="$t('weather.user.restaurant')" class="m-2">
            <b-dropdown-item v-for="category in categories" :key="category" v-on:click="categoryDropdownOnClick(category)">{{category}}
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>
<script>

    import { restaurantService } from '../../../../App'

    export default {
        name: 'CityDropdown',
        components: {},
        data() {
            return {
                categories: []
            }
        },
        mounted() {
            restaurantService.getAllCatgories().then( data => this.categories = data);
        },
        methods: {
            categoryDropdownOnClick(category) {
                this.$emit('categoryDropdownOnClick', category);
            }
        }
    }
</script>
<style scoped>
    #dropdown-button {
        margin-left: 85%;
    }
</style>
