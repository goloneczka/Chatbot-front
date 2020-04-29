<template>
    <div>
        <div v-if="error" class="alert alert-danger" role="alert">
            {{error}}
        </div>
        <a>
            {{$t('jokes.bot.avgRate')}}
            <star-rating :glow="10" :rounded-corners="true"
                         :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
                         :star-size="33" :rating="jokeRate" :read-only="true" :increment="0.01"
                         class="stars"></star-rating>
        </a>

    </div>
</template>

<script>
    import {jokesService} from './../../../App';
    import StarRating from 'vue-star-rating'

    export default {
        name: "JokesMessage",
        components: {StarRating},
        props: ['data'],
        data: function () {
            return {
                jokeRate: null,
                error: ''
            }
        },
        created() {
            jokesService.getAvgRate(this.data).then((data) => {
                if(data.errors){
                    this.error = this.$t('jokes.errors.errorAvgRate') + data.errors[0]
                }
                else{
                    this.jokeRate = data.mark
                }
            })
        }
    }
</script>

<style scoped>
    .message > div {
        border-radius: var(--chat-box-message-bot-border-radius);
        width: auto;
        text-align: center;
    }
    .stars {
        display: block;
    }
</style>