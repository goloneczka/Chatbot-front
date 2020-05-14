<template>
    <div class="city-item">
        <div class="media">
            <div class="media-body">
                <h5 class="mt-0"><b>{{ $t('adminForecasts.nameCity') }}: </b>{{city.city}}</h5>
                <h5 class="mt-0"><b>{{ $t('adminForecasts.nameLatitude') }}: </b>{{city.latitude}}</h5>
                <h5 class="mt-0"><b>{{ $t('adminForecasts.nameLongitude') }}: </b>{{city.longitude}}</h5>
                <h5 class="mt-0"><b>{{ $t('adminForecasts.nameCountry') }}: </b>{{city.country}}</h5>
                <div class="float-right">
                    <button type="button" class="btn btn-primary btn-small mr-1" v-on:click="editCity">{{ $t('adminForecasts.buttonEditCity') }}</button>
                    <button type="button" class="btn btn-danger btn-small mr-1" v-on:click="removeCity">{{ $t('adminForecasts.buttonDeleteCity') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'city-item',
        props: {
            city: Object
        },
        methods: {
            removeCity(){
                this.$emit('removeCity', this.city);
            },
            editCity() {
                this.$emit('editCity', this.city);
            }
        }
    }
</script>
<style scoped>
    .city-item {
        background-color: var(--admin-forecasts-item-bg-color);
        color: var(--admin-forecasts-item-color);
        box-shadow: var(--admin-forecasts-item-box-shadow);
        padding: var(--admin-forecasts-item-padding);
        margin-top: var(--admin-forecasts-margin-top);
    }
</style>
