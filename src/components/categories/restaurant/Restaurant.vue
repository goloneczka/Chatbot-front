<template>
    <div>
        <div id="restaurant-component">
            <UserMessage :text="$t('weather.user.choiceWeather')"/>
            <BotMessage :text="$t('weather.bot.introduction')"/>
            <BImage :botIconSource=this.botIconSource />
            <CityDropdown v-if="showCityDropdown"/>
            <div v-if="botCityMessage">
                <UserMessage :text="`${this.$t('weather.user.chooseCity')} ${this.city}`"/>
                <BotMessage :text="$t('weather.bot.choiceTime')"/>
                <BImage :botIconSource=this.botIconSource />
            </div>
            <div v-for="(isShow, index) in showCategoryDropdown1" v-bind:key=index>
                <RestaurantCategory :bot-icon-source=botIconSource :more=showMore1[index]
                                    :show-category-dropdown=isShow :number=index :city=city />
            </div>
        </div>
    </div>
</template>
<script>

    import UserMessage from "../../common/UserMessage";
    import BotMessage from "../../common/BotMessage";
    import CityDropdown from "../shared/models/CityDropdown";
    import BImage from "../../common/BImage";
    import RestaurantCategory from "./models/RestaurantCategory";

    export default {
        name: 'Restaurant',
        components: {RestaurantCategory, UserMessage, BotMessage, CityDropdown, BImage},
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

                showCategoryDropdown1: [],
                showMore1: []

            }
        },
        mounted() {
            this.$root.$on('cityDropdownOnClick', (text) => {
                this.cityDropdownOnClick(text);
            });
            this.$root.$on('closeCategoryDropdown', (number) => {
                this.showCategoryDropdown1[number] = false;
            });
            this.$root.$on('addChoseDropdown', () => {
                this.showCategoryDropdown1.push(true);
            });
            this.$root.$on('closeMore', (number) => {
                this.showMore1[number] = false;
            });
            this.$root.$on('addMore', () => {
                this.showMore1.push(true);
            });
        },
        methods: {
            cityDropdownOnClick(value) {
                this.showCityDropdown = false;
                this.city = value;
                this.botCityMessage = true;
                this.showCategoryDropdown1[0] = true;
                this.removeBotImage()
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
