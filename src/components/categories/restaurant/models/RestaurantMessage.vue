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
        mounted() {
            this.name = this.data.name;
            this.address = this.data.address;
            this.restaurantRate = this.data.averageUsersRating;
        }
    }
</script>
<style scoped/>
