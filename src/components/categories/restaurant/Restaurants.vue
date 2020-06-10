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
    import {setMessage} from "../../common/messages";

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
            this.sendMessage("user", this.$t('food.user.choiceRestaurant')).then(() => {
                this.sendMessage("bot", this.$t('weather.bot.introduction')).then(() => {
                    this.showCityDropdown = true;
                })
            });
        },
        mounted() {
            this.$root.$on('addNewCategoryMessage', () => {
                this.choosenCategories.push(true)
            });
            this.$root.$on('addNestedMessage', (auth, text, style) => {
                this.sendNestedMessage(auth, text, style);
            });
        },
        methods: {
            sendMessage(author, text, style ) {
                return new Promise((resolve) => {
                    const message = setMessage(author, text, style, resolve)
                    this.$emit('addMessage', message)
                });
            },
            sendNestedMessage(message) {
                return this.$emit('addMessage', message)
            },
            cityDropdownOnClick(value) {
                this.showCityDropdown = false;
                this.city = value;
                this.sendMessage("user", `${this.$t('weather.user.chooseCity')} ${this.city.city}`).then(() => {
                    this.sendMessage("bot", this.$t('food.bot.foodCategory')).then(() => {
                        this.choosenCategories.push(true);
                    })
                });
            }
        },
    }
</script>
<style scoped>


</style>
