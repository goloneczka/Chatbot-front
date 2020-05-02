<template>
    <div>
        <ul>
            <li class="message">
                <div>
                    <div>
                        <h3>{{this.name}}</h3>
                        <h5>{{this.address}}</h5>
                    </div>
                    <div>
                        <star-rating :glow="10" :rounded-corners="true"
                                     :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
                                     :rating="restaurantRate" @rating-selected="setRating" :increment="0.5"
                                     :show-rating="false"
                                     v-bind:star-size="20" :read-only="noActive" />
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>

    import StarRating from 'vue-star-rating'
    import {restaurantService} from "../../../../App";

    export default {
        name: 'RestaurantMessage',
        props: ['data', 'noActive'],
        components: {
            StarRating
        },
        data() {
            return {
                name: '',
                address: '',
                restaurantRate: 0,
                reRender: true
            }
        },
        mounted() {
            this.name = this.data.name;
            this.address = this.data.address;
            restaurantService.getAvgRate(this.data.id).then((data) => {
                if (data.errors) {
                    this.$root.$emit("showDanger", this.$t('jokes.errors.errorAvgRate') + data.errors[0]);
                } else {
                    this.restaurantRate = data.mark
                }
            })
        },
        methods: {
            setRating(rating) {
                restaurantService.rateJoke(rating, this.data.id).then((data) => {
                    if (data.errors)
                        this.$emit("showDanger", this.$t('jokes.errors.errorRateJoke') + data.errors[0]);
                    else {
                        restaurantService.getAvgRate(this.data.id).then((retData) => {
                            if (retData.errors)
                                this.$emit("showDanger", this.$t('jokes.errors.errorAvgRate') + retData.errors[0]);
                            else {
                                this.restaurantRate = retData.mark;
                                this.$emit("rated");
                            }
                        })
                    }
                });
            }
        },

    }
</script>
<style scoped>
    .message > div {
        border-radius: var(--chat-box-message-bot-border-radius);
        width: auto;
        text-align: center;
    }

</style>
