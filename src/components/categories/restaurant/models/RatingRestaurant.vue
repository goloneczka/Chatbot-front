<template>
    <div class="rating-jokes" >
        <star-rating :glow="10" :rounded-corners="true"
                     :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
                     @rating-selected="setRating" :increment="0.5" :show-rating="false" class="stars"></star-rating>
    </div>

</template>

<script>
    import StarRating from 'vue-star-rating'
    import {restaurantService} from "../../../../App";

    export default {
        name: "RatingRestaurant",
        components: {
            StarRating
        },
        data: function () {
            return {
                rating: true,
                rated: false,
                restaurantRate: 0
            }
        },
        props: ['restaurantId'],
        methods: {
            setRating(rating) {
                restaurantService.rateRestaurant(rating, this.restaurantId).then((data) => {
                    if (data.errors)
                        this.$root.$emit("showDanger", this.$t('food.errors.errorRateRestaurant') + data.errors[0]);
                    else {
                        this.$root.$emit('sendNestedMessage', 'user', `${rating} ${this.$t('food.user.maxRate')}`);
                        this.$emit("onRatedRestaurant");
                    }
                });
            },
        }
    }
</script>

<style scoped>
    .rating-jokes {
        text-align: right !important;
    }

    .stars {
        float: right !important;
    }
</style>