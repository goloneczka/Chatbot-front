<template>
    <div>
        <div id="restaurant-component">
            <transition name="button-picker-slide">
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
            sendMessage(author, text) {
                return new Promise((resolve) => {
                    this.$emit('addMessage', {
                        author: author,
                        text: text,
                        style: 'default',
                        resolve: resolve
                    })
                });
            },
            sendNestedMessage(message) {
                return new Promise((resolveNested) => {
                    this.$emit('addMessage', {
                        ...message,
                        resolve: resolveNested
                    })
                }).then(() => message.resolve());
            },
            cityDropdownOnClick(value) {
                this.showCityDropdown = false;
                this.city = value;
                this.sendMessage("user", `${this.$t('weather.user.chooseCity')} ${this.city.city}`).then(() => {
                    this.sendMessage("bot", this.$t('food.bot.foodCategory'));
                });
                this.choosenCategories[0] = true;
            }
        },
    }
</script>
<style scoped>
    @import "../../../../src/assets/buttonAnimate.css";

</style>
