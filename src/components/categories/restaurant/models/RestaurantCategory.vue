<template>
    <div>
        <div>
            <CategoryDropdown v-if="showCategoryDropdown" @categoryDropdownOnClick="this.categoryDropdownOnClick"/>
            <div v-if="botRestaurantMessage" />
            <div id="more-details" v-if="more1">
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
            <div id="more-nested-details" v-if="more2">
                <b-button id="rateRest" class="m-2" v-on:click="this.showRateRestaurant">
                    {{$t('food.user.rateRestauration')}}
                </b-button>
            </div>
            <RatingRestaurant v-if="rate" :restaurant-id="restaurantData.id" @onRatedRestaurant="this.sendRatedMessage"/>
        </div>
    </div>
</template>
<script>

    import {restaurantService} from "../../../../App";
    import CategoryDropdown from "./CategoryDropdown";
    import RatingRestaurant from "./RatingRestaurant";


    export default {
        name: 'Restaurant',
        components: {
            RatingRestaurant,
             CategoryDropdown
        },
        props: ['showCategoryDropdown', 'city', 'number'],
        data: function () {
            return {
                category: '',
                botRestaurantMessage: false,
                menu: false,
                restaurantData: {},
                menuData: '',
                more1: false,
                more2: false,
                rate: false,
            }
        },
        methods: {
            categoryDropdownOnClick(value) {
                this.category = value;
                this.$emit('closeCategoryDropdown');

                restaurantService.getRestaurantData(this.city, this.category).then((restaurantData) => {
                    this.restaurantData = restaurantData;
                    this.$root.$emit('sendNestedMessage', 'user', `${this.$t('weather.user.myChoice')} ${this.category}`);
                    this.$root.$emit('sendNestedMessage', 'bot', `${this.$t('food.bot.foodPredictions')}
                                                ${this.category} ${this.$t('food.bot.for')} ${this.city}`);
                    this.$root.$emit('sendNestedData', 'bot', this.restaurantData, 'restaurantMessage');
                    this.more1 = true;
                });
            },
            showNewCategoryMessage() {
                this.more1 = false;
                this.$root.$emit('sendNestedMessage', 'user', this.$t('food.user.choiceNewCategory'));
                this.$root.$emit('sendNestedMessage', 'bot', this.$t('food.bot.foodCategory'));
                this.$emit('addChoseDropdown');
            },
            showAnotherRestaurantMessage() {
                restaurantService.getRestaurantData(this.city, this.category).then((restaurantData) => {
                    this.restaurantData = restaurantData;
                    this.$root.$emit('sendNestedData', 'bot', this.restaurantData, 'restaurantMessage');
                });
            },
            showMenuMessage() {
                this.more1 = false;
                restaurantService.getMenuData(this.restaurantData.id).then(menuData => {
                    this.menuData = menuData;
                    this.$root.$emit('sendNestedMessage', 'user', this.$t('food.user.choiceMenu'));
                    this.$root.$emit('sendNestedData', 'bot', this.menuData, 'menuMessage');
                })
                this.more2 = true;
            },
            sendRatedMessage(){
                this.rate = false;
                this.$root.$emit('sendNestedData', 'bot', this.restaurantData.id, 'ratedRestaurantMessage');
                this.more2 = false;
                this.endTalk();
            },
            showRateRestaurant() {
                this.rate = true;
                this.more1 = false;
            },
            endTalk() {
                this.$root.$emit('sendNestedMessage', "user", this.$t('weather.user.thank'));
                this.$root.$emit('sendNestedMessage', "bot", this.$t('weather.bot.couldHelp'));
                this.$root.$emit('sendNestedMessage', "bot", this.$t('weather.bot.anythingToDo'));
                this.$root.$emit('exitCategory');
            },
        },

    }
</script>
<style scoped>
    #more-details {
        margin-left: 41%;
        display: inline;
    }
    #more-nested-details {
        margin-left: 85%;
        display: inline;
    }
</style>
