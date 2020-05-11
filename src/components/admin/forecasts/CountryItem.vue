<template>
    <div class="country-item">
        <div class="media">
            <div class="media-body">
                <h5 class="mt-0">{{country.country}}</h5>
                <div class="float-right">
                    <button type="button" class="btn btn-success btn-small mr-1" v-on:click="showCitiesForCountry">{{ $t('adminForecasts.buttonGoToCountry') }}</button>
                    <button type="button" class="btn btn-primary btn-small mr-1" v-on:click="editCountry">{{ $t('adminForecasts.buttonEditCountry') }}</button>
                    <button type="button" class="btn btn-danger btn-small mr-1" v-on:click="removeCountry">{{ $t('adminForecasts.buttonDeleteCountry') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'country-item',
        props: {
            country: Object
        },
        methods: {
            removeCountry(){
                this.$emit('removeCountry', this.country);
            },
            editCountry() {
                this.$emit('editCountry', this.country);
            },
            showCitiesForCountry() {
                this.$emit('showCitiesForCountry', this.country);
            },
        }
    }
</script>
<style scoped>
    .country-item {
        background-color: var(--admin-forecasts-item-bg-color);
        color: var(--admin-forecasts-item-color);
        box-shadow: var(--admin-forecasts-item-box-shadow);
        padding: var(--admin-forecasts-item-padding);
        margin-top: var(--admin-forecasts-margin-top);
    }
</style>
