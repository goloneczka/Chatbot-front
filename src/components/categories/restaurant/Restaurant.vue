<template>
    <div>
        <div id="weather-component">
            <UserMessage :text="$t('weather.user.choiceWeather')" />
            <BotMessage :text="$t('weather.bot.introduction')" />
            <BImage :botIconSource=this.botIconSource />
            <CityDropdown v-if="showCityDropdown"/>
            <div v-if="botCityMessage">
                <UserMessage :text="`${this.$t('weather.user.chooseCity')} ${this.city}`"  />
                <BotMessage :text="$t('weather.bot.choiceTime')" />
                <BImage :botIconSource=this.botIconSource  />
            </div>
            <CategoryDropdown v-if="showCategoryDropdown"/>
            <div v-if="botRestaurantMessage">
                <UserMessage :text="`${this.$t('weather.user.myChoice')} ${this.category}`" />
                <BotMessage :text="`${this.$t('weather.bot.myPredictions')} ${this.city} ${this.$t('weather.bot.in')} ${this.category}....`" />
                <RestaurantMessage :data="this.restaurantData" />
                <BImage :botIconSource=this.botIconSource />
            </div>
            <div v-if="endOrDetailsButtons">
                <b-button id="showNewCategoryMessageButton" class="m-2" v-on:click="this.showNewCategoryMessage">{{$t('weather.user.thank')}}</b-button>
                <b-button id="moreDetailsButton" class="m-2" v-on:click="this.showAnotherRestaurantMessage">{{$t('weather.user.moreDetails')}}</b-button>
                <b-button id="changeRestauration" class="m-2" v-on:click="this.showMenuMessage">{{$t('weather.user.moreDetails')}}</b-button>
            </div>
            <div v-if="menu">
                <UserMessage :text="this.$t('weather.user.moreDetails')" />
                <MenuMessage :data="this.menuData" />
            </div>
            <div v-if="details">
                <UserMessage :text="this.$t('weather.user.moreDetails')" />
                <WeatherDetailsMessage :data="this.weatherData" />
            </div>
            <div v-if="endWeather">
                <UserMessage :text="this.$t('weather.user.thank')"/>
                <BotMessage :text="this.$t('weather.bot.couldHelp')"/>
                <BotMessage :text="this.$t('weather.bot.anythingToDo')"/>
                <BImage :botIconSource=this.botIconSource />
            </div>
        </div>
    </div>
</template>
<script>

    import { restaurantService } from "../../../App";

    import UserMessage from "../../common/UserMessage";
    import BotMessage from "../../common/BotMessage";
    import CityDropdown from "../shared/models/CityDropdown";
    import BImage from "../../common/BImage";
    import RestaurantMessage from "./models/RestaurantMessage";
    import WeatherDetailsMessage from "../weather/models/WeatherDetailsMessage";
    import CategoryDropdown from "./models/CategoryDropdown";
    import MenuMessage from "./models/MenuMessage";

    export default {
        name: 'Restaurant',
        components: {
            MenuMessage,
            WeatherDetailsMessage, RestaurantMessage, CategoryDropdown, UserMessage, BotMessage, CityDropdown, BImage},
        props: ['botIconSource'],
        data: function () {
            return {
                restaurantId: '',
                city: '',
                category: '',
                time: '',
                userTime: '',
                timeDropdown: false,
                showCityDropdown: true,
                showCategoryDropdown: false,
                endOrDetailsButtons: false,
                details: false,
                endWeather: false,
                botCityMessage: false,
                botRestaurantMessage: false,
                menu: false,
                weatherData: '',
                restaurantData: '',
                menuData: '',

            }
        },
        mounted() {
            this.$root.$on('cityDropdownOnClick', (text) => {
                this.cityDropdownOnClick(text);
            });
            this.$root.$on('categoryDropdownOnClick', (text) => {
                this.categoryDropdownOnClick(text);
            });
        },
        methods: {
            cityDropdownOnClick(value) {
                this.showCityDropdown = false;
                this.city = value;
                this.botCityMessage = true;
                this.showCategoryDropdown = true;
                this.removeBotImage()
            },
            categoryDropdownOnClick(value) {
                this.showCategoryDropdown = false;
                this.category = value;
                restaurantService.getRestaurantData(this.city, this.category).then((restaurantData) => {
                    this.restaurantData = restaurantData;

                    this.botCityMessage = true;
                    this.botRestaurantMessage = true;
                    this.removeBotImage()
                    this.endOrDetailsButtons = true;
                });
            },
            showNewCategoryMessage() {
                this.removeBotImage();
                this.endOrDetailsButtons = false;
                this.endTalk();
            },
            showAnotherRestaurantMessage() {
                restaurantService.getRestaurantData(this.city, this.category).then((restaurantData) => {
                    this.restaurantData = restaurantData;
                });
            },
            showMenuMessage() {
                this.endOrDetailsButtons = false;
                restaurantService.getMenuData(this.restaurantId).then(menuData =>{
                    this.menuData = menuData;
                    this.menu = true;
                })
                this.removeBotImage();
                this.endTalk();
            },
            endTalk(){
                this.details = false;
                this.menu = false;
                this.endWeather = true;
                this.$root.$emit("showCategories");
            },
            removeBotImage() {
                const array = document.getElementsByClassName('bot-image');
                array.item(array.length - 1).remove();
            }
        },

    }
</script>
<style scoped>
</style>
