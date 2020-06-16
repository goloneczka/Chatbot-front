<template>
    <div class="currency-chooser">
        <b-dropdown v-bind:text="$t('fortune.buttons.choiceCurrency')"
                    v-bind:class="themeService.getActiveTheme().themeName">
            <b-dropdown-item v-for="currency in curriences" v-bind:key="currency" v-on:click="chosenCategory(currency)">
                {{currency}}
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>

    import {fortuneService} from './../../../../App';
    import {themeService} from "../../../../App";

    export default {
        name: "CurrencyDropdown",
        data: function () {
            return {
                curriences: [],
                themeService
            }
        },
        mounted() {
            fortuneService.getAllCurrencies().then(result => this.curriences = result)
        },
        methods: {
            chosenCategory(currency) {
                this.$root.$emit('showCurrency', currency)
            },
        }
    }
</script>

<style scoped>
    .currency-chooser {
        text-align: right;
    }
</style>
