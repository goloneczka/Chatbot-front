<template>
    <div>
        <div id="restaurant-component">
            <CityDropdown v-on:cityDropdownOnClick="cityDropdownOnClick($event)" v-if="showCityDropdown"/>
            <div v-for="(shouldShow, index) in showCategoryDropdown1" v-bind:key=index>
                <RestaurantCategory @addChoseDropdown="addCategoryDropdownOnClick"
                                    @closeCategoryDropdown="closeCategoryDropdownOnClick"
                                    :number=index :city="city"
                                    :show-category-dropdown="shouldShow"/>
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
                showCityDropdown: true,
                botRestaurantMessage: false,
                showCategoryDropdown1: [],

            }
        },
        created() {
            this.sendMessage("user", this.$t('food.user.choiceRestaurant'));
            this.sendMessage("bot", this.$t('weather.bot.introduction'));
        },
        mounted() {
            this.$root.$on('sendNestedMessage', (auth, text) => {
                this.sendMessage(auth, text);
            });
            this.$root.$on('sendNestedData', (auth, text, style) => {
                this.sendData(auth, text, style);
            });
        },
        methods: {
            sendMessage(author, text) {
                this.$emit('addMessage', {
                    author: author,
                    text: text,
                    style: 'default'
                })
            },
            sendData(author, text,style) {
                this.$emit('addMessage', {
                    author: author,
                    data: text,
                    style: style
                })
            },
            sendDataToChange(author, text,style) {
                this.$emit('changeMessage', {
                    author: author,
                    data: text,
                    style: style
                })
            },
            addCategoryDropdownOnClick() {
                this.showCategoryDropdown1.push(true);
            },
            closeCategoryDropdownOnClick() {
                this.showCategoryDropdown1.pop();
                this.showCategoryDropdown1.push(false);
            },
            cityDropdownOnClick(value){
                this.showCityDropdown = false;
                this.city = value;
                this.sendMessage("user", `${this.$t('weather.user.chooseCity')} ${this.city.city}`);
                this.sendMessage("bot", this.$t('food.bot.foodCategory'));
                this.showCategoryDropdown1[0] = true;
            }

        },

    }
</script>
<style scoped>
    /deep/ button {
        border-radius: 1.0rem;
    }
</style>
