<template>
    <div>
        <div>
            <CategoryDropdown v-if="showCategoryDropdown" @categoryDropdownOnClick="categoryDropdownOnClick"/>
            <div id="more-details" v-if="moreDetails">
                <b-button class="m-2" v-on:click="showNewCategoryMessage">
                    {{$t('food.user.choiceNewCategory')}}
                </b-button>
                <b-button class="m-2" v-on:click="showAnotherRestaurantMessage">
                    {{$t('food.user.choiceAnotherRestaurant')}}
                </b-button>
                <b-button class="m-2" v-on:click="showRatingMessage">
                    {{$t('food.user.rateRestaurationChoice')}}
                </b-button>
            </div>
            <RatingRestaurant v-if="rate" :restaurant-id="restaurantData.id"
                              @onRatedRestaurant="this.sendRatedMessage"/>
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
            CategoryDropdown, RatingRestaurant
        },
        props: ['showCategoryDropdown', 'city', 'number'],
        data: function () {
            return {
                category: '',
                menu: false,
                restaurantData: {},
                menuData: '',
                moreDetails: false,
                rate: false,
            }
        },
        methods: {
            categoryDropdownOnClick(value) {
                this.category = value;
                this.$emit('closeCategoryDropdown');
                restaurantService.getRestaurantOfCityAndCategory(this.city.id, this.category).then((restaurantData) => {
                    if (restaurantData.errors)
                        this.$root.$emit("showDanger", this.$t('food.errors.errorGetRestaurantData') + restaurantData.errors[0]);
                    else {
                        this.restaurantData = restaurantData;
                        this.$root.$emit('sendNestedMessage', 'user', `${this.$t('weather.user.myChoice')} ${this.category}`);
                        this.$root.$emit('sendNestedMessage', 'bot', `${this.$t('food.bot.foodPredictions')}
                                               ${this.city.city} ${this.$t('food.bot.for')} ${this.category}`);
                        this.$root.$emit('sendNestedData', 'bot', this.restaurantData, 'restaurantMessage');
                        this.moreDetails = true;
                    }
                });
            },
            showNewCategoryMessage() {
                this.moreDetails = false;
                this.$root.$emit('sendNestedMessage', 'user', this.$t('food.user.choiceNewCategory'));
                this.$root.$emit('sendNestedMessage', 'bot', this.$t('food.bot.foodCategory'));
                this.$emit('addChoseDropdown');
            },
            showAnotherRestaurantMessage() {
                restaurantService.getRestaurantOfCityAndCategory(this.city.id, this.category).then((restaurantData) => {
                    if (restaurantData.errors)
                        this.$root.$emit("showDanger", this.$t('food.errors.errorGetRestaurantData') + restaurantData.errors[0]);
                    else {
                        this.restaurantData = restaurantData;
                        this.$root.$emit('sendNestedData', 'bot', this.restaurantData, 'restaurantMessage');
                    }
                });
            },
            showRatingMessage() {
                this.$root.$emit('sendNestedMessage', "user", this.$t('food.user.rateRestauration'));
                this.$root.$emit('sendNestedMessage', "bot", this.$t('food.bot.addRate'));
                this.rate = true;
                this.moreDetails = false;
            },
            sendRatedMessage() {
                this.rate = false;
                this.$root.$emit('sendNestedMessage', "bot", this.$t('food.bot.ratedRestaurant'));
                this.endTalk();
            },
            endTalk() {
                this.$root.$emit('sendNestedMessage', "bot", this.$t('weather.bot.anythingToDo'));
                this.$root.$emit('exitCategory');
            },
        },

    }
</script>
<style scoped>
    #more-details {
        text-align: right;
    }
</style>
