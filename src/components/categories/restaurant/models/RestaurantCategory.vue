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
                <b-button class="m-2" v-on:click="showMenuMessage">
                    {{$t('food.user.choiceMenu')}}
                </b-button>
            </div>
        </div>
    </div>
</template>
<script>

    import {restaurantService} from "../../../../App";
    import CategoryDropdown from "./CategoryDropdown";


    export default {
        name: 'Restaurant',
        components: {
            CategoryDropdown
        },
        props: ['showCategoryDropdown', 'city', 'number'],
        data: function () {
            return {
                category: '',
                menu: false,
                restaurantData: {},
                menuData: '',
                moreDetails: false,
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
            showMenuMessage() {
                this.moreDetails = false;
                restaurantService.getMenuOfRestaurant(this.restaurantData.id).then(menuData => {
                    if (menuData.errors)
                        this.$root.$emit("showDanger", this.$t('food.errors.errorGetMenu') + menuData.errors[0]);
                    else {
                        this.menuData = menuData;
                        this.$root.$emit('sendNestedMessage', 'user', this.$t('food.user.choiceMenu'));
                        this.$root.$emit('sendNestedData', 'bot', this.menuData, 'menuMessage');
                        this.endTalk();
                    }
                })
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
        margin-left: 43%;
        display: inline;
    }
</style>
