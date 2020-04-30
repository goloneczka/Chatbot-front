<template>
    <div class="rating-jokes">
        <star-rating :glow="10" :rounded-corners="true"
                     :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
                     @rating-selected="setRating" :increment="0.5" :show-rating="false" class="stars"></star-rating>
    </div>
</template>

<script>
    import StarRating from 'vue-star-rating'
    import {jokesService} from './../../../App'

    export default {
        name: "RatingJoke",
        components: {
            StarRating
        },
        props: ['jokeId'],
        methods: {
            setRating(rating) {
                jokesService.rateJoke(rating, this.jokeId).then((data) => {
                    if(data.errors){
                        this.$root.$emit("showDanger",this.$t('jokes.errors.errorRateJoke') + data.errors[0]);
                    }
                    else {
                        this.$emit('showRating', rating)
                    }
                });
            }
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