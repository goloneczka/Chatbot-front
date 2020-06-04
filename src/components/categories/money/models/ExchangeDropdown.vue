<template>
    <div class="exchangeChooser">
        <b-dropdown v-bind:text="$t('money.buttons.choiceExchange')">
            <b-dropdown-item v-for="exchange in exchanges" v-bind:key="exchange" v-on:click="chooseExchange(exchange)">
                {{exchange.name}}
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>



    import {moneyService} from "../../../../App";

    export default {
        name: "ExchangeDropdown",
        data: function(){
            return{
                exchanges: []
            }
        },
        mounted() {
            moneyService.getAllCompanies().then(result => this.exchanges = result);
        },
        methods:{
            chooseExchange(exchange){
                this.$root.$emit('chooseExchange', exchange)
            }
        }
    }
</script>

<style scoped>
    .exchangeChooser {
        text-align: right;
    }
</style>
