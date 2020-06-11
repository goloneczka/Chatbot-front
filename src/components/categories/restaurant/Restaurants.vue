<template>
    <div>
        <div id="restaurant-component">
            <transition name="button-dropdown-slide">
                <CityDropdown v-on:cityDropdownOnClick="cityDropdownOnClick($event)" v-if="showCityDropdown"/>
            </transition>
            <div v-for="(item, index) in choosenCategories" v-bind:key=index>
                <RestaurantCategory :number=index :city="city"/>
            </div>
        </div>
    </div>
</template>
<script>

    import CityDropdown from "./models/CityDropdown";
    import RestaurantCategory from "./models/RestaurantCategory";
    import {sendMessage} from "../../common/messages";

    export default {
        name: 'Restaurants',
        components: {RestaurantCategory, CityDropdown},

        props: [],
        data: function () {
            return {
                city: {},
                showCityDropdown: false,
                botRestaurantMessage: false,
                choosenCategories: [],

            }
        },
        created() {
           sendMessage( this, "user", this.$t('food.user.choiceRestaurant')).then(() => {
               sendMessage( this, "bot", this.$t('weather.bot.introduction')).then(() => {
                    this.showCityDropdown = true;
                })
            });
        },
        mounted() {
            this.$root.$on('addNewCategoryMessage', () => {
                this.choosenCategories.push(true)
            });
            this.$root.$on('addNestedMessage', (author, text, style, resolve)  => {
                return sendMessage(this, author, text, style).then(() => {
                    resolve()
                })
            });
        },
        methods: {
            cityDropdownOnClick(value) {
                this.showCityDropdown = false;
                this.city = value;
               sendMessage( this, "user", `${this.$t('weather.user.chooseCity')} ${this.city.city}`).then(() => {
                   sendMessage( this, "bot", this.$t('food.bot.foodCategory')).then(() => {
                        this.choosenCategories.push(true);
                    })
                });
            }
        },
    }
</script>
<style scoped>

    /deep/ button {
        border-radius: 1.0rem;
    }

</style>
