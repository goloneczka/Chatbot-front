<template>
    <div>
        <transition name="button-dropdown-slide">
            <CategoryDropdown class="right-align" v-if="showCategoryDropdown" :city-id="city.id"
                              @categoryDropdownOnClick="categoryDropdownOnClick"/>
        </transition>
        <transition name="button-picker-slide">
            <div class="right-align" v-if="moreDetails">
                <b-button class="m-2" v-on:click="showNewCategoryMessage"
                          v-bind:class="themeService.getActiveTheme().themeName">
                    {{$t('food.user.choiceNewCategory')}}
                </b-button>
                <b-button class="m-2" v-on:click="showAnotherRestaurantMessage"
                          v-bind:class="themeService.getActiveTheme().themeName">
                    {{$t('food.user.choiceAnotherRestaurant')}}
                </b-button>
                <b-button class="m-2" v-on:click="showRatingMessage"
                          v-bind:class="themeService.getActiveTheme().themeName">
                    {{$t('food.user.rateRestaurationChoice')}}
                </b-button>
            </div>
        </transition>
        <transition name="button-picker-slide">
            <RatingRestaurant v-if="rate" :restaurant-id="restaurantData.id"
                              @onRatedRestaurant="this.sendRatedMessage"/>
        </transition>
    </div>
</template>
<script>

    import {themeService} from "../../../../App";
    import {restaurantService} from "../../../../App";
    import CategoryDropdown from "./CategoryDropdown";
    import RatingRestaurant from "./RatingRestaurant";


    export default {
        name: 'Restaurant',
        components: {
            CategoryDropdown, RatingRestaurant
        },
        props: ['city', 'number'],
        data: function () {
            return {
                showCategoryDropdown: false,
                category: '',
                menu: false,
                restaurantData: {},
                menuData: '',
                moreDetails: false,
                rate: false,
                themeService
            }
        },
        mounted() {
            this.showCategoryDropdown = true;
        },
        methods: {
            sendNestedMessage(author, text, style) {
                return new Promise(resolve =>
                     this.$root.$emit('addNestedMessage', author, text, style, resolve)
                )
            },
            categoryDropdownOnClick(value) {
                this.category = value;
                this.showCategoryDropdown = false;
                restaurantService.getRestaurantOfCityAndCategory(this.city.id, this.category).then((restaurantData) => {
                    if (restaurantData.errors)
                        this.$root.$emit("showDanger", this.$t('food.errors.errorGetRestaurantData') + restaurantData.errors[0]);
                    else {
                        this.restaurantData = restaurantData;
                        this.sendNestedMessage('user', `${this.$t('user.myChoice')} ${this.category}`).then(() => {
                            this.sendNestedMessage('bot', `${this.$t('food.bot.foodPredictions')}
                                               ${this.city.city} ${this.$t('food.bot.for')} ${this.category}`).then(() => {
                                this.sendNestedMessage('bot', this.restaurantData, 'restaurantMessage').then(() => {
                                    this.moreDetails = true;
                                })
                            })
                        })
                    }
                })
            },
            showNewCategoryMessage() {
                this.moreDetails = false;
                this.sendNestedMessage('user', this.$t('food.user.choiceNewCategory')).then(() => {
                    this.sendNestedMessage('bot', this.$t('food.bot.foodCategory')).then(() => {
                        this.$root.$emit('addNewCategoryMessage');
                    })
                });
            },
            showAnotherRestaurantMessage() {
                restaurantService.getRestaurantOfCityAndCategory(this.city.id, this.category).then((restaurantData) => {
                    if (restaurantData.errors)
                        this.$root.$emit("showDanger", this.$t('food.errors.errorGetRestaurantData') + restaurantData.errors[0]);
                    else {
                        this.restaurantData = restaurantData;
                        this.sendNestedMessage('bot', this.restaurantData, 'restaurantMessage');
                    }
                });
            },
            showRatingMessage() {
                this.moreDetails = false;
                this.sendNestedMessage("user", this.$t('food.user.rateRestauration')).then(() => {
                    this.sendNestedMessage("bot", this.$t('food.bot.addRate')).then(() => {
                        this.rate = true;
                    })
                })
            },
            sendRatedMessage(rating) {
                this.rate = false;
                this.sendNestedMessage('user', `${rating} ${this.$t('food.user.maxRate')}`).then(() => {
                    this.sendNestedMessage("bot", this.$t('food.bot.ratedRestaurant')).then(() => {
                        this.sendNestedMessage("bot", this.$t('weather.bot.anythingToDo')).then(() => {
                            this.$root.$emit('exitCategory');
                        })
                    });
                })
            },
        },

    }
</script>
<style scoped>
    .right-align {
        text-align: right;
    }
</style>
