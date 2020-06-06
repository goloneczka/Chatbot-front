<template>
    <div>
        <transition name="button-picker-slide">
            <CategoryDropdown v-if="showCategoryDropdown" :city-id="city.id"
                              @categoryDropdownOnClick="categoryDropdownOnClick"
                              style="--delay: var(--chat-box-meassage-double-delay)"/>
        </transition>
        <transition name="button-picker-slide">
            <div id="more-details" v-if="moreDetails" >
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
        </transition>
        <transition name="button-picker-slide">
        <RatingRestaurant v-if="rate" :restaurant-id="restaurantData.id"
                          @onRatedRestaurant="this.sendRatedMessage"/>
        </transition>
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
            }
        },
        mounted() {
            this.showCategoryDropdown = true
        },
        methods: {
            sendNestedMessage(author, text, style = 'default') {
                return new Promise((resolve) => {
                    const basicMessage = {
                        author: author,
                        style: style,
                        resolve: resolve
                    };
                    let message;
                    if (style === 'default')
                        message = {
                        ...basicMessage,
                            text: text
                        }
                    else {
                        message = {
                            ...basicMessage,
                            data: text
                        }
                    }
                    this.$root.$emit('addNestedMessage', message)
                });
            },
            categoryDropdownOnClick(value) {
                this.category = value;
                this.showCategoryDropdown = false;
                restaurantService.getRestaurantOfCityAndCategory(this.city.id, this.category).then((restaurantData) => {
                    if (restaurantData.errors)
                        this.$root.$emit("showDanger", this.$t('food.errors.errorGetRestaurantData') + restaurantData.errors[0]);
                    else {
                        this.restaurantData = restaurantData;
                        this.sendNestedMessage( 'user', `${this.$t('user.myChoice')} ${this.category}`).then(() => {
                            this.sendNestedMessage( 'bot', `${this.$t('food.bot.foodPredictions')}
                                               ${this.city.city} ${this.$t('food.bot.for')} ${this.category}`).then(() => {
                                this.sendNestedMessage(  'bot', this.restaurantData, 'restaurantMessage').then(() => {
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
                    this.sendNestedMessage('bot', this.$t('food.bot.foodCategory'));
                });
                this.$root.$emit('addNewCategoryMessage');
            },
            showAnotherRestaurantMessage() {
                restaurantService.getRestaurantOfCityAndCategory(this.city.id, this.category).then((restaurantData) => {
                    if (restaurantData.errors)
                        this.$root.$emit("showDanger", this.$t('food.errors.errorGetRestaurantData') + restaurantData.errors[0]);
                    else {
                        this.restaurantData = restaurantData;
                        this.sendNestedMessage( 'bot', this.restaurantData, 'restaurantMessage');
                    }
                });
            },
            showRatingMessage() {
                this.moreDetails = false;
                this.sendNestedMessage( "user", this.$t('food.user.rateRestauration')).then(() => {
                    this.sendNestedMessage( "bot", this.$t('food.bot.addRate')).then(()=>{
                        this.rate = true;
                    })
                })
            },
            sendRatedMessage() {
                this.rate = false;
                this.sendNestedMessage( "bot", this.$t('food.bot.ratedRestaurant')).then(() => {
                    this.sendNestedMessage( "bot", this.$t('weather.bot.anythingToDo')).then(() => {
                        this.$root.$emit('exitCategory');
                    })
                });
            },
        },

    }
</script>
<style scoped>
    @import "../../../../../src/assets/buttonAnimate.css";

    #more-details {
        text-align: right;
    }

</style>
