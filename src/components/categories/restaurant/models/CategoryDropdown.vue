<template>
    <div id="dropdown-button">
        <b-dropdown :text="$t('weather.user.restaurant')" class="m-2">
            <div class="enable-scroll">
            <b-dropdown-item v-for="category in categories" :key="category"
                             v-on:click="categoryDropdownOnClick(category)" style="overflow-y: auto;">{{category}} </b-dropdown-item>
            </div>
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
                categories: [],
            }
        },
        props: ['cityId'],
        mounted() {
            restaurantService.getAllCatgories(this.cityId).then(data => {
                if (data.errors)
                    this.$root.$emit("showDanger", this.$t('food.errors.errorListOfCategories') + data.errors[0]);
                else {
                    this.categories = data
                }
            });
        },
        methods: {
            categoryDropdownOnClick(category) {
                this.$emit('categoryDropdownOnClick', category);
            },
        }
    }
</script>
<style scoped>
    #dropdown-button {
        margin-left: 85%;
    }
    .enable-scroll  {
        height: 150px;
        overflow-y: auto;
    }

</style>
