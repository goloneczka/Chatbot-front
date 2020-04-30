<template>
    <div>
        <div :id="`restaurant-category-component ${this.number}`">
            <CategoryDropdown v-if="showCategoryDropdown" @categoryDropdownOnClick="this.onDropdown"/>
            <div v-if="botRestaurantMessage">
                <UserMessage :text="`${this.$t('weather.user.myChoice')} ${this.category}`"/>
                <BotMessage
                        :text="`${this.$t('food.bot.foodPredictions')} ${this.city} ${this.$t('food.bot.for')} ${this.category}....`"/>
                <RestaurantMessage :data="this.restaurantData"/>
                <BImage :botIconSource=this.botIconSource />
            </div>
            <div v-if="more1">
                <b-button id="showNewCategoryMessageButton" class="m-2"
                          v-on:click="this.showNewCategoryMessage">
                    {{$t('food.user.choiceNewCategory')}}
                </b-button>
                <b-button id="moreDetailsButton" class="m-2"
                          v-on:click="this.showAnotherRestaurantMessage">
                    {{$t('food.user.choiceAnotherRestaurant')}}
                </b-button>
                <b-button id="changeRestauration" class="m-2" v-on:click="this.showMenuMessage">
                    {{$t('food.user.choiceMenu')}}
                </b-button>
            </div>
            <div v-if="menu">
                <UserMessage :text="this.$t('weather.user.moreDetails')"/>
                <MenuMessage :data="this.menuData"/>
                <BImage :botIconSource=this.botIconSource />
            </div>
            <div v-if="details">
                <UserMessage :text="this.$t('weather.user.moreDetails')"/>
                <WeatherDetailsMessage :data="this.weatherData"/>
                <BImage :botIconSource=this.botIconSource />
            </div>
            <div v-if="endRestaurant">
                <UserMessage :text="this.$t('food.user.choiceNewCategory')"/>
                <BotMessage :text="this.$t('food.bot.foodCategory')"/>
                <BImage :botIconSource=this.botIconSource />
            </div>
        </div>
    </div>
</template>
<script>

    import {restaurantService} from "../../../../App";

    import UserMessage from "../../../common/UserMessage";
    import BotMessage from "../../../common/BotMessage";
    import BImage from "../../../common/BImage";
    import RestaurantMessage from "./RestaurantMessage";
    import CategoryDropdown from "./CategoryDropdown";
    import MenuMessage from "./MenuMessage";
    import WeatherDetailsMessage from "../../weather/models/WeatherDetailsMessage";

    export default {
        name: 'Restaurant',
        components: {
            WeatherDetailsMessage,
            MenuMessage, RestaurantMessage, CategoryDropdown, UserMessage, BotMessage, BImage
        },
        props: ['botIconSource', 'showCategoryDropdown', 'city', 'number'],
        data: function () {
            return {
                restaurantId: '',
                category: '',
                details: false,
                endRestaurant: false,
                botRestaurantMessage: false,
                menu: false,
                weatherData: '',
                restaurantData: '',
                menuData: '',
                more1: false,
            }
        },
        methods: {
            onDropdown(value) {
                this.categoryDropdownOnClick(value);
            },
            categoryDropdownOnClick(value) {
                this.category = value;
                this.$emit('closeCategoryDropdown');

                restaurantService.getRestaurantData(this.city, this.category).then((restaurantData) => {
                    this.restaurantData = restaurantData;
                    this.botRestaurantMessage = true;
                    this.more1 = true;
                    this.removeBotImage()
                });
            },
            showNewCategoryMessage() {
                this.details = true;
                this.more1 = false;
                this.$emit('addChoseDropdown');
                this.removeBotImage();
                this.endTalk();
            },
            showAnotherRestaurantMessage() {
                this.details = false;
                restaurantService.getRestaurantData(this.city, this.category).then((restaurantData) => {
                    this.restaurantData = restaurantData;
                });
            },
            showMenuMessage() {
                this.more1 = false;
                restaurantService.getMenuData(this.restaurantId).then(menuData => {
                    this.menuData = menuData;
                    this.menu = true;
                })
                this.removeBotImage();
             //   this.endTalk();
            },
            endTalk() {
                this.details = false;
                this.menu = false;
                this.endRestaurant = true;
                this.$root.$emit("showCategories");
            },
            removeBotImage() {
                const array = document.getElementsByClassName('bot-image');
                if (array.length)
                    array.item(array.length - 1).remove();
            },
        },

    }
</script>
<style scoped>
</style>
