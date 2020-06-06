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
            sendData(author, text, style) {
                this.$emit('addMessage', {
                    author: author,
                    data: text,
                    style: style
                })
            },
            sendDataToChange(author, text, style) {
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
            cityDropdownOnClick(value) {
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

    /deep/ button.light, /deep/ .light /deep/ button {
        background: var(--chat-button-light-theme-bg-color) !important;
        color: var(--chat-button-light-theme-text-color) !important;
        border: var(--button-border-style) var(--chat-button-light-theme-border-color) !important;
    }

    /deep/ button.light:hover, /deep/ .light /deep/ button:hover {
        background: var(--chat-button-hover-light-theme-bg-color) !important;
        color: var(--chat-button-hover-light-theme-text-color) !important;
        border: var(--button-border-style) var(--chat-button-hover-light-theme-border-color) !important;
    }

    /deep/ button.light:active, /deep/ .light /deep/ button:active {
        background: var(--chat-button-active-light-theme-bg-color) !important;
        color: var(--chat-button-active-light-theme-text-color) !important;
        border: var(--button-border-style) var(--chat-button-active-light-theme-border-color) !important;
        box-shadow: none !important;
    }

    /deep/ button.light:focus, /deep/ .light /deep/ button:focus {
        background: var(--chat-button-active-light-theme-bg-color) !important;
        color: var(--chat-button-active-light-theme-text-color) !important;
        border: var(--button-border-style) var(--chat-button-active-light-theme-border-color) !important;
        box-shadow: none !important;
    }

    /deep/ button.dark, /deep/ .dark /deep/ button {
        background: var(--chat-button-dark-theme-bg-color) !important;
        color: var(--chat-button-dark-theme-text-color) !important;
        border: var(--button-border-style) var(--chat-button-dark-theme-border-color) !important;
    }

    /deep/ button.dark:hover, /deep/ .dark /deep/ button:hover {
        background: var(--chat-button-hover-dark-theme-bg-color) !important;
        color: var(--chat-button-hover-dark-theme-text-color) !important;
        border: var(--button-border-style) var(--chat-button-hover-dark-theme-border-color) !important;
    }

    /deep/ button.dark:active, /deep/ .dark /deep/ button:active {
        background: var(--chat-button-active-dark-theme-bg-color) !important;
        color: var(--chat-button-active-dark-theme-text-color) !important;
        border: var(--button-border-style) var(--chat-button-active-dark-theme-border-color) !important;
        box-shadow: none !important;

    }

    /deep/ button.dark:focus, /deep/ .dark /deep/ button:focus {
        background: var(--chat-button-active-dark-theme-bg-color) !important;
        color: var(--chat-button-active-dark-theme-text-color) !important;
        border: var(--button-border-style) var(--chat-button-active-dark-theme-border-color) !important;
        box-shadow: none !important;
    }

    /deep/ button.blue, /deep/ .blue /deep/ button {
        background: var(--chat-button-blue-theme-bg-color) !important;
        color: var(--chat-button-blue-theme-text-color) !important;
        border: var(--button-border-style) var(--chat-button-blue-theme-border-color) !important;
    }

    /deep/ button.blue:hover, /deep/ .blue /deep/ button:hover {
        background: var(--chat-button-hover-blue-theme-bg-color) !important;
        color: var(--chat-button-hover-blue-theme-text-color) !important;
        border: var(--button-border-style) var(--chat-button-hover-blue-theme-border-color) !important;
    }

    /deep/ button.blue:active, /deep/ .blue /deep/ button:active {
        background: var(--chat-button-active-blue-theme-bg-color) !important;
        color: var(--chat-button-active-blue-theme-text-color) !important;
        border: var(--button-border-style) var(--chat-button-active-blue-theme-border-color) !important;
        box-shadow: none !important;
    }

    /deep/ button.blue:focus, /deep/ .blue /deep/ button:focus {
        background: var(--chat-button-active-blue-theme-bg-color) !important;
        color: var(--chat-button-active-blue-theme-text-color) !important;
        border: var(--button-border-style) var(--chat-button-active-blue-theme-border-color) !important;
        box-shadow: none !important;
    }

</style>
