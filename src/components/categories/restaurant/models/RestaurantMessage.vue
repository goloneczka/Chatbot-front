<template>
    <div>
        <div>
            <h3>{{this.name}}</h3>
            <h5>{{this.address}}</h5>
        </div>
        <div>
            <star-rating :glow="10" :rounded-corners="true"
                         :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
                         :rating="restaurantRate" :increment="0.5"
                         :show-rating="false"
                         v-bind:star-size="20" :read-only="true"/>
        </div>
    </div>
</template>
<script>

    import StarRating from 'vue-star-rating'
    import {restaurantService} from "../../../../App";

    export default {
        name: 'RestaurantMessage',
        props: ['data'],
        components: {
            StarRating
        },
        data() {
            return {
                name: '',
                address: '',
                restaurantRate: 0,
            }
        },
        created() {
            this.name = this.data.name;
            this.address = this.data.address;
            restaurantService.getAvgRate(this.data.id).then((data) => {
                if (data.errors)
                    this.$root.$emit("showDanger", this.$t('jokes.errors.errorAvgRate') + data.errors[0]);
                else
                    this.restaurantRate = data.mark;
            })
        },
    }
</script>
<style scoped/>
