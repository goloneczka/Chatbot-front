<template>
    <div class="currencyChooser">
        <b-dropdown v-bind:text="$t('money.buttons.choiceCurrency')">
            <b-dropdown-item v-for="currency in curriences" v-bind:key="currency" v-on:click="chosenCategory(currency)">
                {{currency.name}}
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>

    import { moneyService } from './../../../../App'

    export default {
        name: "CurrencyDropdown",
        data: function(){
            return{
                curriences: []
            }
        },
        mounted() {
            moneyService.getAllCurrencies().then(result => this.curriences = result)
        },
        methods:{
            chosenCategory(currency){
                this.$root.$emit('showCurrency', currency)
            },
        }
    }
</script>

<style scoped>
    .dropdown{
        margin-left: var(--jokes-button-left-margin);
        margin-right: var(--jokes-button-right-margin);
    }
    .currencyChooser {
        text-align: right;
    }
</style>
